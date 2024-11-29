import type { Routine } from "~/interface/routine.type";
import routineData from "~/data/routineData.json";
import augustData from "~/data/augustData.json";
import septemberData from "~/data/septemberData.json";
import type { RoutineDay } from "~/interface/routineDay.type";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import type { RoutineStep } from "~/interface/routineStep.type";

export const useRoutinesStore = defineStore('routine', () => {
    const { $firestore } = useNuxtApp();
    const authStore = useAuthStore();
    const { currentUser } = storeToRefs(authStore);

    const routine: Partial<Routine> = reactive({
        title: '',
        id: '',
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
        })) as Routine[];

        return routines.value;
    }

    const getRoutineById = async (routineId: string) => {
        return new Promise(async (resolve, reject) => {

            if (routines.value.length === 0)
                await getRoutines();

            const routine = routines.value.find(obj => obj.id === routineId);
            if (routine) {
                resolve(routine);
            } else {
                reject(new Error(`Routine with ID ${routineId} not found`));
            }
        });
    }

    const getRoutineStepsByRoutineIdAndDay = async (rId: string, dayId: string) => {
        if (!currentUser.value) {
            return [];
        }
        const routineCollection = collection($firestore, "routineStep");

        const q = query(
            routineCollection,
            where("userId", "==", currentUser.value?.uid),
            where("routineId", "==", rId),
            where("dayId", "==", dayId)
        );
        // Ejecuta la query y obtiene los documentos
        const querySnapshot = await getDocs(q);

        // Mapea los documentos a un array de objetos
        let steps = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return steps;
    }

    const createRoutineStep = async (obj: RoutineStep) => {
        if (!currentUser.value) {
            return false;
        }

        try {
            obj.userId = currentUser.value.uid;

            const routineCollection = collection($firestore, "routineStep");

            const docRef = await addDoc(routineCollection, obj);
        } catch (error) {
            console.error("Error adding document:", error);
            return false;
        }

        return true;
    }


    function loadRoutineData() {
        try {
            Object.assign(routine, augustData);
        } catch (error) {
            console.error('Error al cargar los datos de la rutina:', error);
        }
    }

    function loadRoutineDay(idRoutine: number, idDay: number): RoutineDay | undefined {
        if (routine.id == '')
            loadRoutineData();

        return routine.routineDays?.find(obj => obj.id === idDay);
    };

    return {
        routine: routine,
        loadRoutineData: loadRoutineData,
        loadRoutineDay: loadRoutineDay,
        routines,
        getRoutines,
        getRoutineById,
        getRoutineStepsByRoutineIdAndDay,
        createRoutineStep
    };
});