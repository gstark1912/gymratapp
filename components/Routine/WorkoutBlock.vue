<template>
    <el-descriptions v-for="r in workoutBlock.excercises" :key="r.id" :name="r.id"
        :title="r.completed ? r.title + ' ✅💪' : r.title" direction="vertical" border>
        <div v-if="r.completed !== true">
            <el-descriptions-item v-if="r.photoType" label="Foto" :rowspan="1">
                <el-avatar shape="square" :size="50" :src="squareUrl" />
            </el-descriptions-item>
            <el-descriptions-item v-if="r.reps" label="Reps">{{ r.reps }}</el-descriptions-item>
            <el-descriptions-item v-if="r.series && workoutBlock.type !== 'circuito'" label="Series">{{ r.series
                }}</el-descriptions-item>
            <el-descriptions-item v-if="r.weight" label="Peso">{{ r.weight }}</el-descriptions-item>
            <el-descriptions-item v-if="r.pause" label="Pausa">{{ r.pause }}</el-descriptions-item>

            <el-descriptions-item v-if="r.description" label="Descripcion">{{ r.description }}</el-descriptions-item>

        </div>
        <el-descriptions-item label="Esfuerzo" v-if="workoutBlock.skipEffort !== true">
            <el-rate v-model="r.effort" />
        </el-descriptions-item>
        <el-descriptions-item label="" v-if="isIndivWorkout">
            <el-checkbox v-model="r.completed" :disabled="r.effort === 0"></el-checkbox>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
import type { WorkoutBlock } from '~/interface/workoutBlock.type';

const props = defineProps<{
    workoutBlock: WorkoutBlock
}>();
const isIndivWorkout = props.workoutBlock.type === 'individual';

const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
</script>

<style scoped></style>