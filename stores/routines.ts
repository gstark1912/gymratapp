import type { Routine } from "~/interface/routine.type";

export const useRoutinesStore = defineStore('routine', () => {

    var routineId = 1;
    var dayId = 1;
    const routine: Routine = reactive({
        title: 'Rutina Julio',
        id: routineId++,
        routineDays: [{
            id: dayId++,
            title: 'Día 1',
            completed: true
        },
        {
            id: dayId++,
            title: 'Día 2',
            completed: true
        },
        {
            id: dayId++,
            title: 'Día 3',
            completed: false
        }]
    });

    return {
        routine: routine
    };
});