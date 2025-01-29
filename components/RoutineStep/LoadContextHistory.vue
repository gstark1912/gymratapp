<template>
    <el-dialog v-model="showDialog" title="Cargas pasadas" center :fullscreen="true" destroy-on-close
        :show-close="true">
        <p v-if="!steps">Sin datos..</p>
        <div v-else v-for="(history, index) in steps" :key="index">
            <span>
                <b>{{ history.name }}</b>
                <p v-if="history.dateTime">📅{{ formatDateTime(history.dateTime) }}</p>
            </span>
            <p v-if="history.loadContext.effort">Esfuerzo: <el-rate v-model="history.loadContext.effort" disabled /></p>
            <RoutineStepLoadContext v-if="history.loadContext" :step="history" :feedback="false" />
            <el-timeline style="max-width: 600px; text-align: left">
                <el-timeline-item v-for="(e, index) in history.excercises?.filter(x => x.loadContext)" :key="index">
                    <p>{{ e.name }}</p>
                    <p v-if="e.loadContext.effort">Esfuerzo: <el-rate v-model="e.loadContext.effort" disabled /></p>
                    <RoutineStepLoadContext v-if="e.loadContext" :step="e" :feedback="false" />
                    <em v-else-if="e.description">✍️ {{ e.description }}</em>
                </el-timeline-item>
            </el-timeline>
            <el-divider />
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog" type="danger">X</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { WorkoutSessionStep } from '~/interface/workoutSessionStep.type';



const props = defineProps<{
    dialogFormVisible: boolean,
    routineStepId: string | undefined
}>();

const showDialog = ref(props.dialogFormVisible);
watch(() => props.dialogFormVisible, (newValue) => {
    showDialog.value = newValue;
});

const workoutStore = useWorkoutSessionStore();
const { stepsHistory } = storeToRefs(workoutStore);
const steps = ref<WorkoutSessionStep[]>([]);
onMounted(() => {
    steps.value = stepsHistory.value[props.routineStepId];
    console.log(steps.value);
});

const emit = defineEmits(['update:dialogFormVisible']);

const closeDialog = () => {
    emit('update:dialogFormVisible', false);
};

const formatDateTime = (timestamp: any) => {
    if (!timestamp || !timestamp.seconds) return 'Fecha inválida';
    const date = new Date(timestamp.seconds * 1000); // Convertir segundos a milisegundos
    return date.toLocaleString(); // Formatear como string amigable
};

</script>

<style scoped></style>