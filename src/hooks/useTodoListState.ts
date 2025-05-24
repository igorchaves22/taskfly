import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, type AppDispatchType, type StoreRootStateType } from "~store";

export const useTodoListState = () => {
    const data = useSelector((store: StoreRootStateType) => store.todoList);
    const dispatch = useDispatch<AppDispatchType>();

    const initializeState = useCallback(() => dispatch(actions.initializeStateAction()), [dispatch]);
    const handlers = useMemo(() => ({ initializeState }), [initializeState]);

    return { data, handlers };
};
