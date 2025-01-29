<template>
    <div v-if="showScreen">
        <h3>{{ session.routineName }} - Dia {{ session.dayNumber }}</h3>
        <em>Inicio: {{ session.dateTime?.toLocaleString("es-AR") }}</em>
        <RoutineStepSlider v-if="routine.id && !buttonCompleteRef" :steps="routineSteps" mode="train"
            @readyToSaveSession="readyToSaveSession" />
        <div v-if="buttonCompleteRef">
            <el-divider />
            <el-row>
                <el-col :span="24">
                    <ul v-for="(e, index) in computedSteps" :key="index">
                        <li>{{ e.isSkip ? '❌' : '✅' }} {{ e.name }}</li>
                    </ul>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" :offset="6">
                    <el-button type="primary" @click="saveWorkoutSession()">Guardar Sesión 💾</el-button>
                </el-col>
            </el-row>
        </div>
        <el-divider />
        <el-button @click="back" type="info">Volver</el-button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Routine } from '~/interface/routine.type';
import type { RoutineStep } from '~/interface/routineStep.type';
import type { WorkoutSession } from '~/interface/workoutSession.type';
import { useWorkoutSessionStore } from '~/stores/workoutSession';

const route = useRoute();
const routineId = ref('');
const dayIndex = ref('');
const buttonCompleteRef = ref(false);

const { getRoutineById, getRoutineStepsByRoutineIdAndDay } = useRoutinesStore();
const routine = ref<Partial<Routine>>({});

const workoutStore = useWorkoutSessionStore();
const { createWorkoutSession, startWorkoutSession, getWorkoutSessionStepsHistory } = workoutStore;
const { session, routineSteps } = storeToRefs(workoutStore);

const showScreen = ref(false);
onMounted(async () => {
    routineId.value = route.params.routineId.toString();
    dayIndex.value = route.params.dayId.toString();

    await startWorkoutSession(routineId.value, dayIndex.value);
    routine.value = await getRoutineById(routineId.value) as Routine;
    routineSteps.value = await getRoutineStepsByRoutineIdAndDay(routineId.value, dayIndex.value) as RoutineStep[];

    let date = new Date();
    session.value = {
        routineName: routine.value.name,
        routineId: routine.value.id,
        dayNumber: dayIndex.value,
        dateTime: date
    };

    await getWorkoutSessionStepsHistory(routineId.value, dayIndex.value);
    showScreen.value = true;
});

const back = () => {
    navigateTo('/routines/' + routineId.value + '/day/' + dayIndex.value);
}

const computedSteps = computed(() => {
    return routineSteps.value.sort((a, b) => a.order - b.order);
})

const saveWorkoutSession = async () => {
    await createWorkoutSession(session.value as WorkoutSession);
    navigateTo('/');
};

const readyToSaveSession = () => {
    buttonCompleteRef.value = true;
};

</script>

<style scoped></style>