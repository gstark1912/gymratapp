import type { Routine } from "~/interface/routine.type";
import routineData from "~/data/routineData.json";
import type { RoutineDay } from "~/interface/routineDay.type";

export const useRoutinesStore = defineStore('routine', () => {
    const routine: Routine = reactive({
        title: '',
        id: 0,
        routineDays: []
    });

    function loadRoutineData() {
        try {
            Object.assign(routine, routineData);
        } catch (error) {
            console.error('Error al cargar los datos de la rutina:', error);
        }
    }

    function loadRoutineDay(idRoutine: number, idDay: number): RoutineDay | undefined {
        if (routine.id == 0)
            loadRoutineData();

        return routine.routineDays.find(obj => obj.id === idDay);
    };

    return {
        routine: routine,
        loadRoutineData: loadRoutineData,
        loadRoutineDay: loadRoutineDay,
    };
});