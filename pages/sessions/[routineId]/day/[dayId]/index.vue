<template>
    <div>
        <h2>ARRANCA EL ENTRENAMIENTO</h2>
        <RoutineStepSlider v-if="routine.id" :routineId="routine.id" :dayIndex="dayIndex" mode="train" />
        <el-divider />
        <el-button @click="back" type="info">Volver</el-button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Routine } from '~/interface/routine.type';
import type { RoutineStep } from '~/interface/routineStep.type';

const route = useRoute();
const routineId = ref('');
const dayIndex = ref('');

const { getRoutineById, getRoutineStepsByRoutineIdAndDay } = useRoutinesStore();
const routine = ref<Partial<Routine>>({});
const routineSteps = ref<RoutineStep[]>([]);

onMounted(async () => {
    routineId.value = route.params.routineId.toString();
    dayIndex.value = route.params.dayId.toString();

    routine.value = await getRoutineById(routineId.value) as Routine;
    routineSteps.value = await getRoutineStepsByRoutineIdAndDay(routineId.value, dayIndex.value) as RoutineStep[];
});

const back = () => {
    navigateTo('/routines/' + routineId.value + '/day/' + dayIndex.value);
}

</script>

<style scoped></style>