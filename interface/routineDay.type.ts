import type { WorkoutBlock } from "./workoutBlock.type";

export interface RoutineDay {
    title: string | undefined,
    id: number,
    completed: boolean | undefined,
    blocks: WorkoutBlock[]
}