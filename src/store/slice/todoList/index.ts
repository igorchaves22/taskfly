import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { TODO_LIST_SLICE_CONFIG } from "~utils";
import { actions } from "./actions";

export const todoListSlice = createSlice({
    name: TODO_LIST_SLICE_CONFIG.name,
    initialState: TODO_LIST_SLICE_CONFIG.initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(actions.initializeStateAction.fulfilled, (state, action) => {
                state.groups = {
                    todo: {
                        ...state.groups.todo,
                        loading: false,
                        data: action.payload.paginatedTasks.todo
                    },
                    inProgress: {
                        ...state.groups.todo,
                        loading: false,
                        data: action.payload.paginatedTasks.inProgress
                    },
                    done: {
                        ...state.groups.todo,
                        loading: false,
                        data: action.payload.paginatedTasks.done
                    }
                };
            })
            .addMatcher(isAnyOf(actions.initializeStateAction.pending), (state) => {
                state.groups = {
                    todo: {
                        ...state.groups.todo,
                        loading: true
                    },
                    inProgress: {
                        ...state.groups.todo,
                        loading: true
                    },
                    done: {
                        ...state.groups.todo,
                        loading: true
                    }
                };
            });
    }
});
