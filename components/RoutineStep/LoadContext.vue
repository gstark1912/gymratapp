<template>
    <el-row v-if="step.loadContext" justify="end">
        <el-col :span="12" v-if="step.loadContext.rounds">
            <el-statistic title="Rounds" :value="step.loadContext.rounds[0]" />
        </el-col>
        <el-col :span="12" v-if="step.loadContext.restRound">
            <el-statistic title="Rest per Round" :value="step.loadContext.restRound" suffix="''" />
        </el-col>
        <el-col :span="spanNumber" v-if="step.loadContext.series">
            <el-statistic title="Series" :value="step.loadContext.series[0]" />
        </el-col>
        <el-col :span="spanNumber" v-if="step.loadContext.reps">
            <el-statistic title="Reps" :value="step.loadContext.reps[0]" />
        </el-col>
        <el-col :span="spanNumber" v-else-if="step.loadContext.repInTime">
            <el-statistic title="Reps" :value="step.loadContext.repInTime[0]" suffix="''" />
        </el-col>
        <el-col :span="spanNumber" v-if="step.loadContext.weight">
            <el-statistic title="Weight" :value="step.loadContext.weight[0]" suffix="kg" />
        </el-col>
        <el-col :span="spanNumber" v-if="step.loadContext.restBetweenSeries">
            <el-statistic title="Rest" :value="step.loadContext.restBetweenSeries" suffix="''" />
        </el-col>
        <el-col :span="6" v-if="props.feedback">
            <el-row>
                <el-col :span="12">
                    <p></p>
                    <el-button v-if="!props.step.isReadyToComplete" type="default" @click="completeLoadContext"
                        :icon="EditPen" circle></el-button>
                    <el-button v-else="props.step.isReadyToComplete" type="warning" :icon="EditPen"
                        @click="editFeedback" circle></el-button>
                </el-col>
                <el-col :span="12">
                    <p></p>
                    <el-button type="primary" v-if="props.enableHistory" @click="checkHistory()" :icon="Histogram"
                        circle></el-button>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-row v-if="step.description">
        <el-divider />
        <el-col :span="24">
            <em style="text-align: left;">{{ step.description }}</em>
        </el-col>
    </el-row>
    <RoutineStepLoadContextHistory v-if="props.enableHistory" v-model:dialogFormVisible="historyDialog"
        v-model:routineStepId="step.id" />
</template>

<script setup lang="ts">
import type { RoutineStep } from '~/interface/routineStep.type';
import { EditPen, Histogram } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{
    step: Partial<RoutineStep>,
    feedback: boolean,
    enableHistory?: boolean
}>();

const emit = defineEmits<{
    (event: 'openLoadContextFeedback'): void;
}>();

const spanNumber = ref(0);

const loadContextKeys = [
    'series',
    'repInTime',
    'reps',
    'weight',
    'restBetweenSeries'
];

onMounted(() => {
    if (props.step.loadContext) {
        let propCount = loadContextKeys.filter(key => props.step.loadContext[key]).length;;

        spanNumber.value = Math.floor(18 / propCount);
        props.step.isReadyToComplete = false;
    };
});

const completeLoadContext = () => {
    let result = true;
    if (props.step.excercises) {
        props.step.excercises.forEach((v, i) => {
            if (v.loadContext && v.isReadyToComplete !== true) {
                ElMessage({
                    message: v.name + ' no tiene la carga completada.',
                    type: 'warning',
                });
                result = false;
            }
        })
    }

    if (!result)
        return;

    emit('openLoadContextFeedback');
    props.step.isReadyToComplete = true;
};

const editFeedback = () => {
    emit('openLoadContextFeedback');
}

const historyDialog = ref(false);
const checkHistory = () => {
    historyDialog.value = true;
}

</script>

<style scoped></style>