<template>
    <el-row class="days">
        <el-col :span="24" class="rutina">
            <span>{{ routine.title }}</span>
        </el-col>
        <el-divider />
        <el-col v-for="d in routine.routineDays" :key="d.id" :span="24">
            <div class="dummycontainer">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>{{ d.title }}</span>
                        </div>
                    </template>
                    <p v-if="d.completed">✅</p>
                    <p v-else>⌛</p>
                    <NuxtLink :to="`/routine/${routine.id}/day/${d.id}`">
                        <el-button type="primary" plain>
                            <el-link>
                                Ver más<el-icon class="el-icon--right"><icon-view /></el-icon>
                            </el-link>
                        </el-button>
                    </NuxtLink>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { View as IconView } from '@element-plus/icons-vue'
import { useRoutinesStore } from '~/stores/routines';

const { routine, loadRoutineData } = useRoutinesStore();

onMounted(() => {
    loadRoutineData();
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