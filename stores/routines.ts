import type { Routine } from "~/interface/routine.type";
import routineData from "~/data/routineData.json";
import augustData from "~/data/augustData.json";
import septemberData from "~/data/septemberData.json";
import type { RoutineDay } from "~/interface/routineDay.type";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useRoutinesStore = defineStore('routine', () => {
    const { $firestore } = useNuxtApp();
    const authStore = useAuthStore();
    const { currentUser } = storeToRefs(authStore);

    const routine: Routine = reactive({
        title: '',
        id: 0,
        routineDays: []
    });
    const routines = ref<Routine[]>([]);

    const getRoutines = async () => {
        if (!currentUser.value) {
            routines.value = [];
            return [];
        }

        const routineCollection = collection($firestore, "routine");

        // Crea una query filtrando por el campo "userId"
        const q = query(routineCollection, where("userId", "==", currentUser.value?.uid));

        // Ejecuta la query y obtiene los documentos
        const querySnapshot = await getDocs(q);

        // Mapea los documentos a un array de objetos
        routines.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return routines.value;
    }

    function loadRoutineData() {
        try {
            Object.assign(routine, augustData);
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
        routines,
        getRoutines
    };
});