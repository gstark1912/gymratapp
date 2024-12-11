import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import type { Routine } from "~/interface/routine.type";
import type { RoutineStep } from "~/interface/routineStep.type";
import type { WorkoutSession } from "~/interface/workoutSession.type";

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

            const routineCollection = collection($firestore, "workoutSession");
            const docRef = await addDoc(routineCollection, obj);
        } catch (error) {
            console.error("Error adding document:", error);
            return false;
        }

        return true;
    }

    return {
        createWorkoutSession,
        startWorkoutSession,
        session,
        routineSteps
    };
});