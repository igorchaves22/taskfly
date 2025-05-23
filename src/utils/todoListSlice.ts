import type { ITodoListSliceConfig } from "~types";

export const TODO_LIST_SLICE_CONFIG: ITodoListSliceConfig = {
    name: "todoListSlice",
    initialState: {
        query: {
            search: ""
        },
        groups: {
            todo: {
                offset: 0,
                limit: 20,
                loading: false,
                data: []
            },
            inProgress: {
                offset: 0,
                limit: 20,
                loading: false,
                data: []
            },
            done: {
                offset: 0,
                limit: 20,
                loading: false,
                data: []
            }
        }
    }
};
