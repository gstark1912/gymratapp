<script lang="ts" setup>
</script>

<style scoped>
.el-main {
  font-family: Arial, sans-serif;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.bordered {
  border-width: 1px;
  border-style: dashed;
  border-color: #475669;
}
</style>

<template>
  <div class="common-layout">
    <el-container>
      <AppHeader />
      <el-main>
        <NuxtPage />
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>
