<template>
    <!--<HomeProfile />
    <el-divider />-->

    <el-link>
        A rutinas <el-icon class="el-icon--right"><icon-view /></el-icon>
    </el-link>
    <!--
    <HomeRoutineOverview />
    -->
    <el-divider />
    <!--
    <el-row>
        <el-col :span="24" class="records">
            <span>Últimos logros</span>
        </el-col>
    </el-row>
-->
</template>

<script setup lang="ts">
navigateTo('/sessions');
</script>

<style scoped>
.records span {
    font-weight: bold;
    font-size: 1.25em;
}
</style>