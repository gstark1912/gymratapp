import type { RoutineDay } from "./routineDay.type";

export interface Routine {
    title: string,
    id: string,
    name: string,
    numberOfDays: number,
    routineDays: RoutineDay[]
}