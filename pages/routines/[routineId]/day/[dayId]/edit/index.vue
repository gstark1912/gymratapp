<template>
    <div>
        <h1>Routine Details</h1>
        <h2>Routine: {{ routine.name }}</h2>
        <h3>Día: {{ dayIndex }}</h3>
        <el-carousel v-if="routineSteps.length > 0" type="card" trigger="click" :cardScale="scale" :loop="false"
            indicator-position="none" height="auto" :autoplay="false">
            <el-carousel-item v-for="d in routineSteps" :key="d.id" style="height: auto">
                <div>
                    <h4 justify="center">
                        {{ d.name }}
                    </h4>
                    <el-input type="textarea" :readonly=true :placeholder="JSON.stringify(d)"
                        :autosize="{ minRows: 20, maxRows: 60 }" />
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-form :model="form" ref="addRoutineStep">
            <el-form-item label="Step" prop="routineStep">
                <el-input v-model="form.routineStep" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="watchConsole">Ver en Consola 🖥️</el-button>
                <el-button type="primary" @click="onSubmit">A Firebase 🛫</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Routine } from '~/interface/routine.type';
import type { RoutineStep } from '~/interface/routineStep.type';

const route = useRoute();
const routineId = ref('');
const dayIndex = ref(0);
const scale = ref(0.25);

const { getRoutineById, getRoutineStepsByRoutineIdAndDay, createRoutineStep } = useRoutinesStore();
const routine: Routine = ref<Routine>({});
const routineSteps: RoutineStep[] = ref<RoutineStep[]>([]);

onMounted(async () => {
    routineId.value = route.params.routineId;
    dayIndex.value = route.params.dayId;

    routine.value = await getRoutineById(routineId.value);
    routineSteps.value = await getRoutineStepsByRoutineIdAndDay(routineId.value, dayIndex.value);
});


const form = reactive({
    routineStep: ''
});

let obj: any = null;
const watchConsole = () => {
    obj = JSON.parse(form.routineStep);
    delete obj.id;
    obj.routineId = routineId.value;
    obj.dayId = dayIndex.value;
    console.log(obj);
};

const onSubmit = async () => {
    if (obj) {
        if (await createRoutineStep(obj))
            window.location.reload()
    }
};
</script>

<style scoped>
.el-carousel__item h1 {
    color: #475669;
    opacity: 0.75;
    line-height: 50px;
    margin: 0;
    text-align: center;
}
</style>