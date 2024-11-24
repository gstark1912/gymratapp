export interface LoadContext {
    weight: number[];
    series: number;
    reps: number[];
    repInTime: number[];

    restBetweenSeries: number;

    rounds: number;
    restRound: number;
}