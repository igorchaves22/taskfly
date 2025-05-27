import type { DeepPartial } from "./global";

export type TaskListType = ITask[];

export interface ITask {
    id: number;
    state: "pending" | "in_analysis" | "in_execution" | "paused" | "completed" | "cancelled" | "archived";
    priority: "low" | "medium" | "high";
    time: {
        createdAt: string;
        completedAt: string;
        lastUpdated: string;
        dueDate?: string;
    };
    history?: {
        timestamp: string;
        changes: DeepPartial<Omit<ITask, "id" | ("history" & { time: Pick<ITask["time"], "dueDate"> })>>;
    };
    content: {
        title: string;
        description?: string;
    };
    additionalInfo: {
        tags?: string[];
        notes?: string[];
    };
}
export interface IGroup {
    offset: number;
    limit: number;
    loading: boolean;
    data: TaskListType;
}
export interface ITodoListState {
    query: {
        search?: string;
    };
    groups: {
        todo: IGroup;
        inProgress: IGroup;
        done: IGroup;
    };
}
export interface ITodoListSliceConfig {
    name: string;
    initialState: ITodoListState;
}
