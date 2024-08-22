<template>
    <el-descriptions v-for="r in workoutBlock.excercises" :key="r.id" :name="r.id" :title="r.title">
        <el-descriptions-item><el-avatar shape="square" :size="50" :src="squareUrl" /></el-descriptions-item>
        <el-descriptions-item v-if="r.reps" label="Reps">{{ r.reps }}</el-descriptions-item>
        <el-descriptions-item v-if="r.series" label="Series">{{ r.series }}</el-descriptions-item>
        <el-descriptions-item v-if="r.weight" label="Peso">{{ r.weight }}</el-descriptions-item>
        <el-descriptions-item v-if="r.pause" label="Pausa">{{ r.pause }}</el-descriptions-item>
        {{ r.description }}
    </el-descriptions>
</template>

<script setup lang="ts">
import type { WorkoutBlock } from '~/interface/workoutBlock.type';

const props = defineProps<{
    workoutBlock: WorkoutBlock
}>();

const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
</script>

<style scoped></style>