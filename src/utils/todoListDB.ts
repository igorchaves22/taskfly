import type { ITask } from "~types";
import { initializeDB, openDB, readItemsFromDB } from "./indexedDB";

export const TODO_LIST_DB_CONFIG = {
    name: "taskflyDB",
    version: 1,
    storeName: "tasks"
};

export const openTodoListDB = async () =>
    await openDB(TODO_LIST_DB_CONFIG.name, TODO_LIST_DB_CONFIG.storeName, TODO_LIST_DB_CONFIG.version);
export const initializeTodoListFromDB = async () =>
    await initializeDB(TODO_LIST_DB_CONFIG.name, TODO_LIST_DB_CONFIG.storeName, openTodoListDB);
export const readTasksFromDB = async () => await readItemsFromDB<ITask>(TODO_LIST_DB_CONFIG.storeName, openTodoListDB);
