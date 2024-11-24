import type { RoutineDay } from "./routineDay.type";

export interface Routine {
    title: string,
    id: number,
    name: string,
    numberOfDays: number,
    routineDays: RoutineDay[]
}