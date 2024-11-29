<template>
    <div>
        <h1>Routine Details</h1>
        <p>Routine: {{ routine }}</p>
        <NuxtLink :to="`/routines/${routineId}/day/${dayIndex}/edit`">
            <el-button type="primary" plain>
                <el-link>
                    Edit
                </el-link>
            </el-button>
        </NuxtLink>
        <p>Day: {{ dayIndex }}</p>
        <p v-for="d in routineSteps">
            {{ d }}
        </p>
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

</script>

<style scoped></style>