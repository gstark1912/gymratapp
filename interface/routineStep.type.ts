import type { LoadContext } from "./loadContext.type";
import type { RoutineStepType } from "./routineStepType.enum";

export interface RoutineStep {
    id: string;
    routineId: string;
    dayId: string;
    name: string;
    description: string;
    type: RoutineStepType;
    excerciseRef: string;
    loadContext: LoadContext;
    order: number;
    excercises?: RoutineStep[];
    userId: string;

    // UX needed properties
    isReadyToComplete: boolean;
}