import type { FirebaseModel } from "./firebaseModel.type";
import type { LoadContext } from "./loadContext.type";
import type { RoutineStepType } from "./routineStepType.enum";

export interface RoutineStep extends FirebaseModel {
    routineId: string;
    dayId: string;
    name: string;
    description: string;
    type: RoutineStepType;
    excerciseRef: string;
    loadContext: LoadContext;
    order: number;
    excercises?: RoutineStep[];

    // UX needed properties
    isReadyToComplete: boolean;
    isSkip: boolean;
    isCompleted: boolean;
}