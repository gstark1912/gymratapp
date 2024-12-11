import type { FirebaseModel } from "./firebaseModel.type";

export interface WorkoutSession extends FirebaseModel {
    routineId?: string;
    routineName?: string;
    dateTime?: Date;
    dayNumber?: string;
}