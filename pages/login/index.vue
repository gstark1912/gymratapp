<template>
    <el-row>
        <el-col :span="24" class="login">
            <span>Iniciar Sesión</span>
        </el-col>
        <el-divider />
        <el-col :span="24" class="login">
            <el-form :model="form" ref="loginForm" label-width="auto" style="max-width: 600px">
                <el-form-item label="Email" prop="email">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="Contraseña" prop="password">
                    <el-input v-model="form.password" type="password" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Iniciar Sesión</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '~/stores/authStore';
import { ElMessage } from 'element-plus'
const authStore = useAuthStore();

const { $auth } = useNuxtApp();

const form = reactive({
    email: '',
    password: ''
});

// Función de inicio de sesión
const login = () => {
    signInWithEmailAndPassword($auth, form.email, form.password)
        .then((userCredential: { user: any }) => {
            const user = userCredential.user;

            // Actualiza el store con el usuario autenticado
            authStore.currentUser = user;
            ElMessage({
                message: 'Bienvenido 💪',
                type: 'success',
            });
            navigateTo('/');
        })
        .catch((error: { code: any; message: any }) => {
            const errorMessage = error.message;
            ElMessage.error(errorMessage);
        });
};

const onSubmit = () => {
    login();
};
</script>

<style scoped>
.login span {
    font-weight: bold;
    font-size: 1.5em;
}
</style>
