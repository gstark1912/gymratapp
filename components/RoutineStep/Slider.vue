<template>
    <div v-if="routineSteps.length > 0">
        <el-carousel trigger="click" :loop="false" indicator-position="none" height="auto" :autoplay="false"
            direction="vertical" ref="carouselRef">
            <el-carousel-item v-for="d in routineSteps" :key="d.id" style="height: auto">
                <RoutineStepCard :routineStep="d" :mode="props.mode" />
            </el-carousel-item>
        </el-carousel>
        <div v-if="props.mode === 'train'" style="text-align: center">
            <el-button type="danger" @click="failStep" :disabled="completeEnabled">No lo hice</el-button>
            <el-button type="success" @click="completeStep" :disabled="!completeEnabled">Completar</el-button>
            <el-divider />
        </div>
        <div v-else style="text-align: center">
            <el-button @click="prevSlide">Anterior</el-button>
            <el-button @click="nextSlide">Siguiente</el-button>
            <p v-if="carouselRef">
                {{ (carouselRef.activeIndex + 1) + " de " + stepCount }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { RoutineStep } from '~/interface/routineStep.type';

const { getRoutineStepsByRoutineIdAndDay } = useRoutinesStore();
const routineSteps = ref<RoutineStep[]>([]);
const stepCount = ref(0);

const props = defineProps<{
    routineId: string,
    dayIndex: string,
    mode?: string | null
}>();

onMounted(async () => {
    routineSteps.value = ((await getRoutineStepsByRoutineIdAndDay(props.routineId, props.dayIndex)) as RoutineStep[])
        .sort((a, b) => a.order - b.order)
        .map((step) => reactive(step));

    stepCount.value = routineSteps.value.length;
});

const carouselRef = ref<any>(null);
const buttonCompleteRef = ref<any>(null);
const nextSlide = () => {
    if (carouselRef.value) {
        carouselRef.value.next();
    }
};

// Función para ir al slide anterior
const prevSlide = () => {
    if (carouselRef.value) {
        carouselRef.value.prev();
    }
};

const completeEnabled = computed(() => {
    if (!carouselRef.value) return false;

    const step = routineSteps.value.at(carouselRef.value.activeIndex);

    // Si el paso actual no existe, retorna false
    if (!step) return false;

    // Vue rastreará correctamente `step.isReadyToComplete`
    return step.isReadyToComplete;
});

const completeStep = () => {
    nextOrComplete();
}

const failStep = () => {
    routineSteps.value = routineSteps.value.filter(step => step.id !== routineSteps.value.at(carouselRef.value.activeIndex)?.id);
    stepCount.value--;
    nextOrComplete();
}

const nextOrComplete = () => {
    if ((carouselRef.value.activeIndex + 1) !== stepCount.value)
        nextSlide();
}

</script>

<style scoped></style>