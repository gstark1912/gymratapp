<template>
    <HomeProfile />
    <el-divider />
    <HomeRoutineOverview />
    <el-divider />
    <el-row>
        <el-col :span="24" class="records">
            <span>Últimos logros</span>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
.records span {
    font-weight: bold;
    font-size: 1.25em;
}
</style>