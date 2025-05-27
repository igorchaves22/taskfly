import { useCallback, useMemo, useState } from "react";
import { useTimeout } from "./useTimeout";

type CallbackType =
    | (() => void)
    | {
          applyOn: boolean | "onBothTransitions";
          fn: () => void;
      };
type DelayType =
    | boolean
    | number
    | {
          value?: number;
          doubleMarkers?: boolean;
          applyOn?: boolean | "onBothTransitions";
      };
type StateType<T> = T extends { doubleMarkers: true } ? { immediate: boolean; delayed: boolean } : boolean;

const DEFAULT_VALUE = {
    initialState: false,
    timeoutDelay: 600,
    applyOn: true
};

export const useToggle = <T extends DelayType>(initialState?: boolean, callback?: CallbackType, delay?: T) => {
    const initialStateValue = initialState ?? DEFAULT_VALUE.initialState;
    const isNumberDelay = typeof delay === "number";
    const isObjectDelay = typeof delay === "object";
    const isDoubleMarkers = isObjectDelay && delay.doubleMarkers === true;

    const [state, setState] = useState<StateType<T>>(() => {
        if (isDoubleMarkers) {
            return {
                immediate: initialStateValue,
                delayed: initialStateValue
            } as StateType<T>;
        }

        return initialStateValue as StateType<T>;
    });
    const { runTimeout } = useTimeout();

    const applyCallback = useCallback(
        (currentState: boolean, nextState: boolean) => {
            if (callback) {
                if (typeof callback === "function") return callback();
                if (typeof callback === "object") {
                    const { applyOn, fn } = callback;

                    if (applyOn === "onBothTransitions") return fn();
                    if (applyOn === true && currentState === true && nextState === false) return fn();
                    if (applyOn === false && currentState === false && nextState === true) return fn();
                }
            }
        },
        [callback]
    );
    const delayTime = useMemo(() => {
        if (isNumberDelay) return delay;
        if (isObjectDelay && typeof delay.value === "number") return delay.value;

        return DEFAULT_VALUE.timeoutDelay;
    }, [delay, isNumberDelay, isObjectDelay]);
    const shouldApplyDelay = useCallback(
        (currentState: boolean, nextState: boolean) => {
            if (delay) {
                if (delay === true || typeof delay === "number") return true;
                if (isObjectDelay) {
                    if (delay.doubleMarkers === true) return true;
                    if (delay.applyOn === "onBothTransitions") return true;
                    if (delay.applyOn === true) return currentState === true && nextState === false;
                    if (delay.applyOn === false) return currentState === false && nextState === true;
                    if (typeof delay.value === "number") return true;
                }
            }

            return false;
        },
        [delay, isObjectDelay]
    );
    const applyDelay = useCallback((fn: () => void) => runTimeout(fn, delayTime), [delayTime, runTimeout]);

    const updateState = useCallback(
        (applyValue?: boolean) => {
            const getNextState = (value: boolean) => applyValue ?? !value;

            setState((prevState) => {
                if (typeof prevState === "object") {
                    const currentState = prevState.immediate;
                    const nextState = getNextState(currentState);

                    if (currentState === nextState) return prevState;

                    applyCallback(currentState, nextState);

                    if (shouldApplyDelay(currentState, nextState)) {
                        applyDelay(() =>
                            setState((prevState) =>
                                typeof prevState === "object" ? { ...prevState, delayed: nextState } : prevState
                            )
                        );
                    }

                    return { ...prevState, immediate: nextState } as StateType<T>;
                }

                const nextState = getNextState(prevState);

                if (prevState === nextState) return prevState;

                applyCallback(prevState, nextState);

                if (shouldApplyDelay(prevState, nextState)) {
                    applyDelay(() => setState(nextState as StateType<T>));

                    return prevState;
                }

                return nextState as StateType<T>;
            });
        },
        [applyCallback, applyDelay, shouldApplyDelay]
    );

    return { state, updateState };
};
