<template>
    <div v-if="computedSteps.length > 0">
        <el-carousel trigger="click" :loop="false" indicator-position="none" height="auto" :autoplay="false"
            direction="vertical" ref="carouselRef">
            <el-carousel-item v-for="d in computedSteps" :key="d.id" style="height: auto">
                <RoutineStepCard :routineStep="d" :mode="props.mode"
                    @openLoadContextFeedback="openLoadContextFeedback" />
            </el-carousel-item>
        </el-carousel>
        <div v-if="props.mode === 'train'" style="text-align: center">
            <el-button type="danger" @click="failStep" :disabled="completeEnabled">No lo hice</el-button>
            <el-button type="success" @click="completeStep" :disabled="!completeEnabled">Completar</el-button>
        </div>
        <div v-else style="text-align: center">
            <el-button @click="prevSlide">Anterior</el-button>
            <el-button @click="nextSlide">Siguiente</el-button>
            <p v-if="carouselRef">
                {{ (carouselRef.activeIndex + 1) + " de " + stepCount }}
            </p>
        </div>
    </div>

    <RoutineStepLoadContextFeedback v-model:dialogFormVisible=dialogFormVisible
        v-model:loadContext="dialogLoadContext" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { LoadContext } from '~/interface/loadContext.type';
import type { RoutineStep } from '~/interface/routineStep.type';

const stepCount = ref(0);
const props = defineProps<{
    steps: RoutineStep[]
    mode?: string | null
}>();

onMounted(async () => {
    stepCount.value = props.steps.length;
});

// #region Funcionalidad Carousel
const carouselRef = ref<any>(null);
const nextSlide = () => {
    if (carouselRef.value) {
        carouselRef.value.next();
    }
};

const prevSlide = () => {
    if (carouselRef.value) {
        carouselRef.value.prev();
    }
};

const computedSteps = computed(() => {
    return props.steps.filter(step => step.isSkip !== true && step.isCompleted !== true)
        .sort((a, b) => a.order - b.order);
})

const completeEnabled = computed(() => {
    if (!carouselRef.value) return false;

    const step = computedSteps.value.at(carouselRef.value.activeIndex);

    if (!step) return false;

    return step.isReadyToComplete;
});

const completeStep = () => {
    let step = computedSteps.value.at(carouselRef.value.activeIndex);
    console.log('Completado ' + step?.name);
    if (step)
        step.isCompleted = true;

    stepCount.value--;
    nextOrComplete();
}

const failStep = () => {
    let step = computedSteps.value.at(carouselRef.value.activeIndex);
    console.log('Fallado ' + step?.name);
    if (step)
        step.isSkip = true;

    stepCount.value--;
    nextOrComplete();
}

const nextOrComplete = () => {
    if ((carouselRef.value.activeIndex) !== stepCount.value) {
        nextSlide();
    }
    // Todo completado
    else {
        ElMessage({
            message: 'Todo listo!',
            type: 'info',
        });
        emit("readyToSaveSession");
    }

    console.log(computedSteps.value);
}

// #endregion

const emit = defineEmits<{
    (event: "readyToSaveSession"): void;
}>();

const dialogFormVisible = ref(false);
const dialogLoadContext = ref<Partial<LoadContext> | undefined>(undefined);
const openLoadContextFeedback = (loadContext: LoadContext) => {
    dialogFormVisible.value = !dialogFormVisible.value;
    dialogLoadContext.value = loadContext;
}

</script>

<style scoped></style>