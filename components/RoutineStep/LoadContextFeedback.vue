<template>
    <el-dialog v-model="showDialog" title="Carga" center :fullscreen="false" :show-close="false">
        {{ loadCtx }}
        <el-row v-if="loadCtx" justify="end">
            <el-col :span="12" v-if="loadCtx.rounds">
                <RoutineStepLoadContextFeedbackValue v-model="loadCtx.rounds[0]" :title="'Rondas'" />
            </el-col>
            <el-col :span="12" v-if="loadCtx.restRound">
                <RoutineStepLoadContextFeedbackValue v-model="loadCtx.restRound" :title="'Rest rondas'" />
            </el-col>
            <el-col v-if="loadCtx.series">
                <RoutineStepLoadContextFeedbackValue v-model="loadCtx.series[0]" :title="'Series'" />
            </el-col>
            <el-col v-if="loadCtx.reps">
                <RoutineStepLoadContextFeedbackValue v-model="loadCtx.reps[0]" :title="'Reps'" />
            </el-col>
            <el-col v-else-if="loadCtx.repInTime">
                <RoutineStepLoadContextFeedbackValue v-model="loadCtx.repInTime[0]" :title="'Rest reps'" />
            </el-col>
            <el-col v-if="loadCtx.weight">
                <RoutineStepLoadContextFeedbackValue v-model="loadCtx.weight[0]" :suffix="'kg'" :title="'Weight'" />
            </el-col>
            <el-col v-if="loadCtx.restBetweenSeries">
                <RoutineStepLoadContextFeedbackValue v-model="loadCtx.restBetweenSeries" :title="'Rest series'" />
            </el-col>
            <el-col>
                <el-text tag="sub" size="small">Esfuerzo</el-text>
                <el-rate v-model="loadCtx.effort" />
            </el-col>
        </el-row>
        <br>
        <el-row v-if="loadContext" justify="space-between">
            <el-col :span="24" style="text-align: center;">
                <el-button type="success" @click="save()" :disabled="loadContext.effort === 0">Guardar 💾</el-button>
            </el-col>
        </el-row>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog" type="danger">X</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { LoadContext } from '~/interface/loadContext.type';

const props = defineProps<{
    dialogFormVisible: boolean,
    loadContext: Partial<LoadContext> | undefined
}>();

const showDialog = ref(props.dialogFormVisible);
watch(() => props.dialogFormVisible, (newValue) => {
    showDialog.value = newValue;
});

const loadCtx = reactive<Partial<LoadContext>>(props.loadContext ? props.loadContext : {});
watch(() => props.loadContext, (newValue) => {
    Object.assign(loadCtx, newValue ? newValue : {});
    loadCtx.effort = 0;
});

onMounted(() => {
});

const closeDialog = () => {
    emit('update:dialogFormVisible', false);
};

const emit = defineEmits(['update:dialogFormVisible', 'update:loadContext']);
const save = () => {
    if (!loadCtx?.effort) {
        ElMessage({
            message: 'Debe asignar un nivel de esfuerzo antes de guardar',
            type: 'error',
        });
        return;
    };

    Object.keys(loadCtx).forEach((key) => {
        const value = loadCtx![key as keyof LoadContext];
        if (Array.isArray(value)) {
            if (value.every(v => v === 0)) {
                delete loadCtx![key as keyof LoadContext];
            }
        } else if (value === 0) {
            delete loadCtx![key as keyof LoadContext];
        }
    });

    // Emitir el nuevo objeto limpio al padre
    emit('update:loadContext', { ...loadCtx });
    emit('update:dialogFormVisible', false);
}

</script>

<style scoped></style>