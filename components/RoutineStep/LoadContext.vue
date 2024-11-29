<template>
    <el-row v-if="step.loadContext">
        <el-col :span="8" v-if="step.loadContext.weight">
            <el-statistic title="Weight (kg)" :value="step.loadContext.weight[0]" />
        </el-col>
        <el-col :span="8" v-if="step.loadContext.reps">
            <el-statistic title="Reps" :value="step.loadContext.reps[0]" />
        </el-col>
        <el-col :span="8" v-if="step.loadContext.series">
            <el-statistic title="Series" :value="step.loadContext.series[0]" />
        </el-col>
        <el-col :span="8" v-if="step.loadContext.restBetweenSeries">
            <el-statistic title="Rest" :value="step.loadContext.restBetweenSeries" />
        </el-col>
        <el-col :span="12" v-if="step.loadContext.rounds">
            <el-statistic title="Rounds" :value="step.loadContext.rounds[0]" />
        </el-col>
        <el-col :span="12" v-if="step.loadContext.restRound">
            <el-statistic title="Rest per Round" :value="step.loadContext.restRound" />
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import type { RoutineStep } from '~/interface/routineStep.type';

const props = defineProps<{
    step: Partial<RoutineStep>
}>();
</script>

<style scoped></style>