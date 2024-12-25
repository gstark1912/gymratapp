import type { RoutineStep } from "./routineStep.type";

export interface WorkoutSessionStep extends RoutineStep {
    routineStepId: string;
    workoutSessionId: string;
}