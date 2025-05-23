import { configureStore } from "@reduxjs/toolkit";
import { todoListSlice } from "./slice/todoList";
export { actions } from "./slice/todoList/actions";

export const store = configureStore({
    reducer: {
        todoList: todoListSlice.reducer
    }
});

export type AppDispatchType = typeof store.dispatch;
export type StoreRootStateType = ReturnType<typeof store.getState>;
