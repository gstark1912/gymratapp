<template>
    <RoutineExcercise v-for="r in workoutBlock.excercises" :key="r.id" :name="r.id"
        :skipEffort="workoutBlock.skipEffort" :workoutBlockType="workoutBlock.type" :r="r" />
</template>

<script setup lang="ts">
import type { WorkoutBlock } from '~/interface/workoutBlock.type';

const props = defineProps<{
    workoutBlock: WorkoutBlock
}>();

</script>

<style scoped></style>