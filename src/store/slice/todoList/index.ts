import { createSlice } from "@reduxjs/toolkit";
import { TODO_LIST_SLICE_CONFIG } from "~utils";

export const todoListSlice = createSlice({
    name: TODO_LIST_SLICE_CONFIG.name,
    initialState: TODO_LIST_SLICE_CONFIG.initialState,
    reducers: {}
});
