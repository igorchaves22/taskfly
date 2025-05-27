import { useSelector } from "react-redux";
import type { StoreRootStateType } from "~store";

export const useTodoListState = () => {
    const data = useSelector((store: StoreRootStateType) => store.todoList);

    return { data };
};
