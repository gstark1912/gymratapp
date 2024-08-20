<template>
    <div v-loading="loading">
        <h1>
            {{ routine.title }}
        </h1>
        <el-collapse accordion>
            <el-collapse-item v-for="r in routineDay.blocks" :key="r.id" :name="r.id">
                <template #title>
                    <p><b class="blockItemTitle">{{ r.title }}</b> {{ r.description?.length == 0 ? '' : '- ' +
                        r.description
                        }}</p>
                </template>
                <div>
                    <RoutineWorkoutBlock :workoutBlock="r" />
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import type { RoutineDay } from '~/interface/routineDay.type';
import { useRoutinesStore } from '~/stores/routines';

const { routineId, dayId } = useRoute().params;

const { loadRoutineDay, routine } = useRoutinesStore();

const loading = ref(true);

const routineDay: RoutineDay = reactive({
    id: 0,
    title: '',
    completed: false,
    blocks: []
});

onMounted(() => {
    const day = loadRoutineDay(Number(routineId), Number(dayId));
    Object.assign(routineDay, day);
    loading.value = false;
});

</script>

<style scoped>
.blockItemTitle {
    font-size: medium;
    font-weight: bold;
}


.blockItem p {
    font-size: medium;
}
</style>