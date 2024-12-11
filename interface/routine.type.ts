import type { FirebaseModel } from "./firebaseModel.type";
import type { RoutineDay } from "./routineDay.type";

export interface Routine extends FirebaseModel {
    title: string,
    name: string,
    numberOfDays: number,
    routineDays: RoutineDay[]
}