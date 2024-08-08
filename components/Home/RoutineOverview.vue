<template>
    <el-row class="days">
        <el-col :span="24" class="rutina">
            <span>{{ rutina.title }}</span>
        </el-col>
        <el-divider />
        <el-col v-for="d in rutina.routineDays" :key="d.id" :span="8">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>{{ d.title }}</span>
                    </div>
                </template>
                <p v-if="d.completed">✅</p>
                <p v-else>⌛</p>
                <NuxtLink :to="`/routine/${rutina.id}/day/${d.id}`">
                    <el-link>
                        Ver más<el-icon class="el-icon--right"><icon-view /></el-icon>
                    </el-link>
                </NuxtLink>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { View as IconView } from '@element-plus/icons-vue'
import { useRoutinesStore } from '~/stores/routines';

const { routine: rutina } = useRoutinesStore();

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
</style>