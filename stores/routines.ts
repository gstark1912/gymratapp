import type { Routine } from "~/interface/routine.type";
import routineData from "~/data/routineData.json";
import augustData from "~/data/augustData.json";
import septemberData from "~/data/septemberData.json";
import type { RoutineDay } from "~/interface/routineDay.type";
import { addDoc, collection, getDocs, orderBy, query, where, documentId, doc, updateDoc } from "firebase/firestore";
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
        const loadingInstance1 = ElLoading.service({ fullscreen: true });
        if (!currentUser.value) {
            routines.value = [];
            return [];
        }

        const routineCollection = collection($firestore, "routine");

        // Crea una query filtrando por el campo "userId"
        const q = query(routineCollection,
            where("userId", "==", currentUser.value?.uid),
            orderBy("datetimeCreated", "desc"));

        // Ejecuta la query y obtiene los documentos
        const querySnapshot = await getDocs(q);

        // Mapea los documentos a un array de objetos
        routines.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Routine[];

        loadingInstance1.close();
        return routines.value;
    }

    const getRoutineById = async (routineId: string) => {
        return new Promise(async (resolve, reject) => {

            const loadingInstance1 = ElLoading.service({ fullscreen: true });
            if (routines.value.length === 0)
                await getRoutines();

            const routine = routines.value.find(obj => obj.id === routineId);
            if (routine) {
                resolve(routine);
            } else {
                reject(new Error(`Routine with ID ${routineId} not found`));
            }
            loadingInstance1.close();
        });
    }

    const getRoutineStepsByRoutineIdAndDay = async (rId: string, dayId: string) => {
        if (!currentUser.value) {
            return [];
        }
        const loadingInstance1 = ElLoading.service({ fullscreen: true });
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
        let steps = querySnapshot.docs.map((doc) => {
            let data = doc.data();

            // Asegurar que loadContext existe y que effort esté presente
            if (data.loadContext) {
                if (!("effort" in data.loadContext)) {
                    data.loadContext.effort = 0;
                }
            }

            // Si hay ejercicios, asegurarnos de que cada uno tenga loadContext y effort
            if (data.excercises && Array.isArray(data.excercises)) {
                data.excercises = data.excercises.map((exercise) => {
                    if (exercise.loadContext) {
                        if (!("effort" in exercise.loadContext)) {
                            exercise.loadContext.effort = 0;
                        }
                    }
                    return exercise;
                });
            }

            return {
                id: doc.id,
                ...data
            };
        });
        loadingInstance1.close();
        return steps;
    }

    const createRoutineStep = async (obj: RoutineStep) => {
        if (!currentUser.value) {
            return false;
        }

        const loadingInstance1 = ElLoading.service({ fullscreen: true });
        try {
            obj.userId = currentUser.value.uid;

            const routineCollection = collection($firestore, "routineStep");

            const docRef = await addDoc(routineCollection, obj);
        } catch (error) {
            console.error("Error adding document:", error);
            return false;
        }
        loadingInstance1.close();
        return true;
    }

    const cleanStepBeforeUpdate = (step: any) => {
        // Eliminar propiedades no deseadas
        delete step.isReadyToComplete;
        delete step.isSkip;
        delete step.isCompleted;

        // Verifica si tiene loadContext y lo limpia
        if (step.loadContext) {
            delete step.loadContext.effort;
        }

        // Si tiene ejercicios, iteramos recursivamente
        if (Array.isArray(step.excercises)) {
            step.excercises.forEach(cleanStepBeforeUpdate);
        }
    };

    const updateRoutineSessionStep = async (updatedData: Partial<RoutineStep>) => {
        if (!currentUser.value) {
            return false;
        }

        // Convertir a objeto plano
        const sanitizedData = JSON.parse(JSON.stringify(updatedData));
        cleanStepBeforeUpdate(sanitizedData);
        const loadingInstance = ElLoading.service({ fullscreen: true });
        try {
            const routineDocRef = doc($firestore, "routineStep", sanitizedData.id as string);

            await updateDoc(routineDocRef, sanitizedData);
        } catch (error) {
            console.error("Error updating document:", error);
            return false;
        }
        loadingInstance.close();
        return true;
    };




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
        createRoutineStep,
        updateRoutineSessionStep
    };
});