<template>
    <el-row>
        <el-col :span="24" class="register">
            <span>Crear Usuario</span>
        </el-col>
        <el-divider />
        <el-col :span="24" class="register">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="Nombre">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="Contraseña">
                    <el-input v-model="form.password" type="password" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Crear</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ElMessage } from 'element-plus'

// Initialize Firebase Authentication and get a reference to the service

const { $auth } = useNuxtApp();
var register = async () => {
    await createUserWithEmailAndPassword($auth, form.email, form.password)
        .then((userCredential: { user: any; }) => {
            const user = userCredential.user;
            ElMessage({
                message: 'Bienvenido 💪',
                type: 'success',
            });
        })
        .catch((error: { code: any; message: any; }) => {
            const errorMessage = error.message;
            ElMessage.error(errorMessage);
        });
};

// do not use same name with ref
const form = reactive({
    name: '',
    email: '',
    password: ''
})

const onSubmit = async () => {
    await register();
}
</script>

<style scoped>
.register span {
    font-weight: bold;
    font-size: 1.5em;
}
</style>