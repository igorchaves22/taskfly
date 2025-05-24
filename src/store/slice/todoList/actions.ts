import { createAsyncThunk } from "@reduxjs/toolkit";
import type { StoreRootStateType } from "~store";
import type { TaskListType } from "~types";
import { readTasksFromDB, TODO_LIST_SLICE_CONFIG } from "~utils";

export const actions = {
    initializeStateAction: createAsyncThunk(
        `${TODO_LIST_SLICE_CONFIG.name}/initializeStateAction`,
        async (_, { getState }) => {
            const state = getState() as StoreRootStateType;
            const storedTaskList = await readTasksFromDB();

            const states = {
                todo: ["pending"],
                inProgress: ["in_analysis", "in_execution", "paused"],
                done: ["completed", "cancelled", "archived"]
            };
            const filterByState = (list: TaskListType, groupKey: keyof typeof states) =>
                list.filter((item) => states[groupKey].includes(item.state));
            const paginate = (list: TaskListType) =>
                list.slice(state.todoList.groups.todo.offset, state.todoList.groups.todo.limit);

            const filteredTasks = {
                todo: filterByState(storedTaskList, "todo"),
                inProgress: filterByState(storedTaskList, "inProgress"),
                done: filterByState(storedTaskList, "done")
            };
            const paginatedTasks = {
                todo: paginate(filteredTasks.todo),
                inProgress: paginate(filteredTasks.inProgress),
                done: paginate(filteredTasks.done)
            };

            return { paginatedTasks };
        }
    )
};
