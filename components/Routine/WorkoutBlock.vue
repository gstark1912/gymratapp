<template>
    <div>
        {{ workoutBlock }}
    </div>
</template>

<script setup lang="ts">
import type { WorkoutBlock } from '~/interface/workoutBlock.type';

const props = defineProps<{
    workoutBlock: WorkoutBlock
}>();
</script>

<style scoped></style>