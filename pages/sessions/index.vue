<template>
    <el-row class="days">
        <el-col :span="24" class="rutina">
            <span>Últimos entrenamientos</span>
        </el-col>
        <el-divider />
        <NuxtLink :to="`/routines/`">
            <el-button type="primary" plain>
                <el-link>
                    A entrenar pa 👉
                </el-link>
            </el-button>
        </NuxtLink>
        <el-col v-if="sessions" v-for="d in sessions" :key="d.id" :span="24">
            <div class="dummycontainer">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>📅{{ new Date(d.dateTime.seconds * 1000).toLocaleDateString() }}</span>
                        </div>
                    </template>
                    <el-row>
                        <el-col :span="24">
                            <span>{{ d.routineName }} - Día {{ d.dayNumber }}</span>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import type { WorkoutSession } from '~/interface/workoutSession.type';

const { getSessions } = useWorkoutSessionStore();
const sessions = ref<WorkoutSession[] | undefined>(undefined);

onMounted(async () => {
    sessions.value = await getSessions();
});

</script>

<style scoped>
.days el-card {
    margin: 10px;
    background-color: #c2c2c2;
    width: 100%;
    text-align: center;
}

.card-header span {
    font-weight: bold;
}

.rutina span {
    font-weight: bold;
    font-size: 1.5em;
}

.dummycontainer {
    padding: 10px
}
</style>