<template>
    <div class="toolbar">
        <el-avatar :size="40"
            src='https://t4.ftcdn.net/jpg/07/04/95/71/360_F_704957132_fed1XncFqXDPP52rd8A7Ci03uHG0L8yl.jpg' />
        <el-text v-if="user" class="toolbar-text" size="large">Hola {{ user.email }} 👋</el-text>

    </div>
</template>

<script setup lang="ts">

let user = ref({});
const authStore = useAuthStore();

const { getCurrentUser } = authStore;

onMounted(async () => {
    let currentUser = await getCurrentUser();
    if (currentUser) {
        user.value = currentUser;
    }
});

</script>

<style scoped>
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    background-color: snow;
}

.toolbar-text {
    font-size: 17px;
    margin-left: 10px;
    flex-grow: 1;
    text-align: right;
    padding-right: 20px;
}
</style>