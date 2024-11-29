<template>
    <el-carousel v-if="routineSteps.length > 0" trigger="click" :loop="false" indicator-position="none" height="auto"
        :autoplay="false" direction="vertical" ref="carouselRef">
        <el-carousel-item v-for="d in sortedRoutineSteps" :key="d.id" style="height: auto">
            <RoutineStepCard :routineStep="d" />
        </el-carousel-item>
    </el-carousel>
    <el-button @click="prevSlide">Anterior</el-button>
    <el-button @click="nextSlide">Siguiente</el-button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { RoutineStep } from '~/interface/routineStep.type';

const { getRoutineStepsByRoutineIdAndDay } = useRoutinesStore();
const routineSteps = ref<RoutineStep[]>([]);


const props = defineProps<{
    routineId: string,
    dayIndex: string
}>();

onMounted(async () => {
    routineSteps.value = ((await getRoutineStepsByRoutineIdAndDay(props.routineId, props.dayIndex)) as RoutineStep[]);
});

const sortedRoutineSteps = computed(() => {
    return [...routineSteps.value].sort((a, b) => a.order - b.order);
});

const carouselRef = ref<any>(null);
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

</script>

<style scoped></style>