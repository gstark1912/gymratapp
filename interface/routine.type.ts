import type { RoutineDay } from "./routineDay.type";

export interface Routine {
    title: string,
    id: number,
    routineDays: RoutineDay[]
}