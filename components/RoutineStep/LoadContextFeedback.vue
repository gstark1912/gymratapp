<template>
    <el-dialog v-model="showDialog" title="Carga" center :fullscreen="false" destroy-on-close :show-close="false">
        <el-row v-if="loadContext" justify="end">
            <el-col :span="12" v-if="loadContext.rounds">
                <RoutineStepLoadContextFeedbackValue v-model="loadContext.rounds[0]" :title="'Rondas'" />
            </el-col>
            <el-col :span="12" v-if="loadContext.restRound">
                <RoutineStepLoadContextFeedbackValue v-model="loadContext.restRound" :title="'Rest rondas'" />
            </el-col>
            <el-col v-if="loadContext.series">
                <RoutineStepLoadContextFeedbackValue v-model="loadContext.series[0]" :title="'Series'" />
            </el-col>
            <el-col v-if="loadContext.reps">
                <RoutineStepLoadContextFeedbackValue v-model="loadContext.reps[0]" :title="'Reps'" />
            </el-col>
            <el-col v-else-if="loadContext.repInTime">
                <RoutineStepLoadContextFeedbackValue v-model="loadContext.repInTime[0]" :title="'Rest reps'" />
            </el-col>
            <el-col v-if="loadContext.weight">
                <RoutineStepLoadContextFeedbackValue v-model="loadContext.weight[0]" :suffix="'kg'" :title="'Weight'" />
            </el-col>
            <el-col v-if="loadContext.restBetweenSeries">
                <RoutineStepLoadContextFeedbackValue v-model="loadContext.restBetweenSeries" :title="'Rest series'" />
            </el-col>
        </el-row>
        <br>
        <el-row v-if="loadContext" justify="space-between">
            <el-col :span="24" style="text-align: center;">
                <el-button type="success" @click="save()">Guardar 💾</el-button>
            </el-col>
        </el-row>
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

onMounted(() => {
});

const emit = defineEmits(['update:dialogFormVisible']);
const save = () => {
    emit('update:dialogFormVisible', false);
}

</script>

<style scoped></style>