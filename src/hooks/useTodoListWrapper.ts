import { useCallback, useEffect, useRef } from "react";
import { useTodoListState } from "./useTodoListState";
import { useToggle } from "./useToggle";

const DELAY = {
    value: 1100,
    loaderOffset: 100
};

export const useTodoListWrapper = () => {
    const { state: isInitialized, updateState: updateInitialization } = useToggle(undefined, undefined, {
        value: DELAY.value,
        applyDelayOn: false
    });
    const initializationTriggered = useRef(false);
    const {
        handlers: { initializeState }
    } = useTodoListState();

    const exitDelayValue = DELAY.value - DELAY.loaderOffset;
    const initialize = useCallback(() => {
        if (!initializationTriggered.current && !isInitialized) {
            initializationTriggered.current = true;
            initializeState();
            updateInitialization(true);
        }
    }, [initializeState, isInitialized, updateInitialization]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return { isInitialized, exitDelayValue };
};
