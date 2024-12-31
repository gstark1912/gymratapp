import { addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy, query, startAfter, where, writeBatch } from "firebase/firestore";
import type { Routine } from "~/interface/routine.type";
import type { RoutineStep } from "~/interface/routineStep.type";
import type { WorkoutSession } from "~/interface/workoutSession.type";
import type { WorkoutSessionStep } from "~/interface/workoutSessionStep.type";

export const useWorkoutSessionStore = defineStore('workoutSession', () => {
    const { $firestore } = useNuxtApp();
    const authStore = useAuthStore();
    const { currentUser } = storeToRefs(authStore);

    const routineStore = useRoutinesStore();
    const { getRoutineById, getRoutineStepsByRoutineIdAndDay } = routineStore;

    const session = ref<Partial<WorkoutSession>>({});
    const routineSteps = ref<RoutineStep[]>([]);

    const startWorkoutSession = async (routineId: string, dayIndex: string) => {
        let routine = await getRoutineById(routineId) as Routine;
        routineSteps.value = (await getRoutineStepsByRoutineIdAndDay(routineId, dayIndex) as RoutineStep[])
            .sort((a, b) => a.order - b.order)
            .map((step) => reactive(step));

        session.value = {
            routineName: routine.name,
            routineId: routine.id,
            dayNumber: dayIndex,
            dateTime: new Date()
        }
    };

    const createWorkoutSession = async (obj: WorkoutSession) => {
        if (!currentUser.value) {
            return false;
        }

        try {
            obj.userId = currentUser.value.uid;
            const loadingInstance1 = ElLoading.service({ fullscreen: true });
            const routineCollection = collection($firestore, "workoutSession");
            const docRef = await addDoc(routineCollection, obj);
            const result = await saveWorkoutSessionSteps(docRef.id);

            if (!result) {
                // Si el resultado es falso, elimina el documento recién creado
                await deleteDoc(doc($firestore, "workoutSession", docRef.id));
                console.error("Documento eliminado debido a un resultado fallido.");
            }
            loadingInstance1.close();
        } catch (error) {
            console.error("Error adding document:", error);
            return false;
        }

        return true;
    };

    const saveWorkoutSessionSteps = async (id: string) => {
        try {
            let objs = routineSteps.value.map((item) => {
                return {
                    dayId: item.dayId,
                    excerciseRef: item.excerciseRef,
                    routineStepId: item.id,
                    isSkip: item.isSkip,
                    loadContext: item.loadContext,
                    name: item.name,
                    routineId: item.routineId,
                    userId: item.userId,
                    workoutSessionId: id,
                    excercises: item.excercises?.map((exercise) => ({
                        dayId: exercise.dayId,
                        excerciseRef: exercise.excerciseRef,
                        routineStepId: exercise.id,
                        isSkip: exercise.isSkip,
                        loadContext: exercise.loadContext,
                        name: exercise.name,
                        routineId: exercise.routineId,
                        userId: exercise.userId,
                        workoutSessionId: id,
                    })),
                }
            }) as WorkoutSessionStep[];
            const batch = writeBatch($firestore);
            const collectionRef = collection($firestore, "workoutSessionStep");

            objs.forEach((docData) => {
                const cleanedDoc = Object.fromEntries(
                    Object.entries(docData).filter(([_, value]) => value !== undefined)
                );

                if (cleanedDoc.excercises && Array.isArray(cleanedDoc.excercises)) {
                    cleanedDoc.excercises = cleanedDoc.excercises.map((exercise) =>
                        Object.fromEntries(
                            Object.entries(exercise).filter(([_, value]) => value !== undefined)
                        )
                    );
                }

                const docRef = doc(collectionRef); // Crea un nuevo documento con un ID único
                batch.set(docRef, cleanedDoc); // Agrega la operación al batch
            });

            try {
                await batch.commit(); // Envía todas las operaciones a Firestore
                console.log("Todos los documentos fueron agregados exitosamente");
            } catch (error) {
                console.error("Error al agregar los documentos: ", error);
            }
        } catch (error) {
            console.error("Error adding document:", error);
            return false;
        }

        return true;
    };

    const getSessions = async (lastVisibleDoc: any = null) => {
        if (!currentUser.value) {
            return [];
        };

        const loadingInstance1 = ElLoading.service({ fullscreen: true });
        const routineCollection = collection($firestore, "workoutSession");

        let q = query(
            routineCollection,
            where("userId", "==", currentUser.value?.uid),
            orderBy("dateTime", "desc"),
            limit(5)
        );

        if (lastVisibleDoc) {
            q = query(q, startAfter(lastVisibleDoc));
        };

        // Ejecuta la query y obtiene los documentos
        const querySnapshot = await getDocs(q);

        // Mapea los documentos a un array de objetos
        let sessions: WorkoutSession[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            dateTime: doc.data().dateTime.toDate(),
            ...doc.data() as WorkoutSession, // Aseguramos que los datos tengan el tipo esperado
        }));
        loadingInstance1.close();
        return sessions;
    };

    return {
        createWorkoutSession,
        startWorkoutSession,
        getSessions,
        session,
        routineSteps
    };
});