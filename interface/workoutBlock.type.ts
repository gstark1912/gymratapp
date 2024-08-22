import type { Excercise } from "./excercise.type"

export interface WorkoutBlock {
    title: string | undefined,
    id: number | undefined,
    description: string | undefined,
    type: string | undefined,
    series: number | undefined,
    round: string | undefined,
    rest: string | undefined,
    restBetweenSeries: string | undefined
    workTime: string | undefined,
    excercises: Excercise[]
}