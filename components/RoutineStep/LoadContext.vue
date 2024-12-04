<template>
    <el-row v-if="step.loadContext">
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
    </el-row>
    <el-row v-if="step.description">
        <el-divider />
        <el-col :span="24">
            <em style="text-align: left;">{{ step.description }}</em>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import type { RoutineStep } from '~/interface/routineStep.type';

const props = defineProps<{
    step: Partial<RoutineStep>
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
    if (props.step.loadContext)
        spanNumber.value = 24 / loadContextKeys.filter(key => props.step.loadContext[key]).length;
});

</script>

<style scoped></style>