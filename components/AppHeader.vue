<template>
    <div class="toolbar">
        <el-avatar :size="40"
            src='https://t4.ftcdn.net/jpg/07/04/95/71/360_F_704957132_fed1XncFqXDPP52rd8A7Ci03uHG0L8yl.jpg' />
        <div v-if="user.email !== ''">
            <el-text class="toolbar-text" size="large">Hola {{ user.displayName }}</el-text>
            <el-button type="primary" @click="goToProfile()" :icon="UserFilled" circle></el-button>
            <el-button type="danger" @click="logOff()" :icon="SwitchButton" circle></el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UserFilled, SwitchButton } from '@element-plus/icons-vue'
import { navigateTo } from 'nuxt/app';

const authStore = useAuthStore();
const { logOffUser } = authStore;
const { currentUser } = storeToRefs(authStore);

let user = ref({
    email: ""
});

watchEffect(() => {
    if (currentUser.value)
        user.value = currentUser.value;
    else {
        user.value = {
            email: ""
        }
    }
});

const logOff = async () => {
    await logOffUser();
    navigateTo('/login');
}


const goToProfile = () => {
    navigateTo('/profile');
}

</script>

<style scoped>
.toolbar {
    display: flex;
    align-items: left;
    justify-content: space-between;
    width: 100%;
    margin: 10px;
    background-color: snow;
}

.toolbar-text {
    font-size: 17px;
    margin-left: 10px;
    flex-grow: 1;
    text-align: right;
    padding-right: 20px;
    vertical-align: middle;
}
</style>