import { useCallback, useEffect } from "react";
import { initializeTodoListFromDB } from "~utils";
import { useToggle } from "./useToggle";

const DELAY = {
    value: 1100,
    loaderOffset: 100
};

export const useApp = () => {
    const { state: isInitialized, updateState: updateInitialization } = useToggle(undefined, undefined, {
        value: DELAY.value,
        applyOn: false
    });

    const exitDelayValue = DELAY.value - DELAY.loaderOffset;
    const initialize = useCallback(async () => {
        if (!isInitialized) {
            const result = await initializeTodoListFromDB();

            if (result) {
                updateInitialization(true);
            }
        }
    }, [isInitialized, updateInitialization]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return { isInitialized, exitDelayValue };
};
