<template>
    <el-row class="days">
        <el-col :span="24" class="rutina">
            <span>Rutinas</span>
        </el-col>
        <el-divider />
        <el-col v-for="d in routines" :key="d.id" :span="24">
            <div class="dummycontainer">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>{{ d.name }}</span>
                        </div>
                    </template>
                    <el-row>
                        <el-col :span="8" v-for="index in Array.from({ length: d.numberOfDays }, (_, i) => i)"
                            :key="index">
                            <NuxtLink :to="`/routines/${d.id}/day/${index}`">
                                <el-button type="primary" plain>
                                    <el-link>
                                        Día {{ index }}
                                    </el-link>
                                </el-button>
                            </NuxtLink>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
const { getRoutines } = useRoutinesStore();
const { routines } = storeToRefs(useRoutinesStore());

onMounted(async () => {
    await getRoutines();
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