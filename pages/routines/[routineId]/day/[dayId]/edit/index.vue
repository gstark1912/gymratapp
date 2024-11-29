<template>
    <div>
        <h2>Routine: {{ routine.name }}</h2>
        <h3>Día: {{ dayIndex }}</h3>
        <RoutineStepSlider v-if="routine.id" :routineId="routine.id" :dayIndex="dayIndex" />
        <el-divider />
        <el-form :model="form" ref="addRoutineStep">
            <el-form-item label="Step" prop="routineStep">
                <el-input v-model="form.routineStep" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="watchConsole">Ver en Consola 🖥️</el-button>
                <el-button type="primary" @click="onSubmit">Insertar en Firebase 🔥</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Routine } from '~/interface/routine.type';

const route = useRoute();
const routineId = ref('');
const dayIndex = ref('');

const { getRoutineById, createRoutineStep } = useRoutinesStore();
const routine = ref<Partial<Routine>>({});

onMounted(async () => {
    routineId.value = route.params.routineId.toString();
    dayIndex.value = route.params.dayId.toString();

    routine.value = await getRoutineById(routineId.value) as Routine;
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

<style scoped></style>