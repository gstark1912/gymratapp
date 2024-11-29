<template>
    <div class="routineStepCard">
        <h4 justify="center">
            {{ step.name }}
        </h4>
        <el-image class="card-image" :src="src" fit="contain" />
        <RoutineStepLoadContext v-if="step.loadContext" :step="step" />
        <div v-if="step.excercises">
            <el-divider />
            <div v-if="step.type == RoutineStepType.Individual">
                <RoutineStepCard v-for="(e, index) in step.excercises" :key="index" :routine-step="e" />
            </div>
            <div v-else-if="(step.type == RoutineStepType.Circuit || step.type == RoutineStepType.WarmUp)">
                <el-timeline style="max-width: 600px; text-align: left">
                    <el-timeline-item v-for="(e, index) in step.excercises" :key="index">
                        <p>{{ e.name }}</p>
                        <RoutineStepLoadContext v-if="e.loadContext" :step="e" />
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { RoutineStep } from '~/interface/routineStep.type';
import { RoutineStepType } from '~/interface/routineStepType.enum';

const step = ref<Partial<RoutineStep>>({});
const src = ref('https://thumbs.dreamstime.com/b/cat-gym-fitness-workout-set-illustration-cute-minimalist-doodle-vector-exercise-themed-designs-playful-features-cats-342273270.jpg');
const props = defineProps<{
    routineStep: RoutineStep
}>();

onMounted(async () => {
    step.value = props.routineStep;
});

</script>

<style scoped>
.routineStepCard {
    text-align: center;
    height: 60vh;
    overflow: auto
}

.routineStepCard .card-image {
    width: 100%;
    height: 20%;
}

.el-carousel__item h1 {
    color: #475669;
    opacity: 0.75;
    line-height: 50px;
    margin: 0;
    text-align: center;
}
</style>