<template>
    <el-row>
        <el-col :span="24" class="profile">
            <span>Perfil de Usuario</span>
        </el-col>
        <el-divider />
        <el-col :span="24" class="profile">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-row justify="center">
                    <el-form-item :span="12">
                        <el-image style="width: 100px; height: 100px" :src="form.photoUrl" fit="fill" />
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="PhotoUrl">
                        <el-input v-model="form.photoUrl">
                            <template #prepend>Http://</template>
                        </el-input>
                    </el-form-item>

                    <!-- Nombre -->
                    <el-form-item label="Nombre">
                        <el-input v-model="form.name" />
                    </el-form-item>

                    <!-- Email -->
                    <el-form-item label="Email">
                        <el-input v-model="form.email" readonly />
                    </el-form-item>

                    <!-- Rutina Actual -->
                    <el-form-item label="Rutina Actual">
                        <el-select v-model="form.currentRoutine" placeholder="Select" size="large" style="width: 240px">
                            <el-option v-for="item in options" :key="item" :label="item" :value="item" />
                        </el-select>
                    </el-form-item>

                    <el-row>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">Guardar</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="backHome">Volver</el-button>
                        </el-form-item>
                    </el-row>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
const { updateUserProfile } = authStore;

const form = reactive({
    photoUrl: currentUser.value?.photoURL,
    name: currentUser.value?.displayName,
    email: currentUser.value?.email,
    currentRoutine: 1,
});

const options = ref([1, 2, 3, 4, 5]);

const onSubmit = async () => {
    await updateUserProfile(currentUser.value, form.name, form.photoUrl);
    backHome();
};

const backHome = () => {
    navigateTo('/');
}
</script>

<style scoped>
.profile span {
    font-weight: bold;
    font-size: 1.5em;
}

.centered-item {
    display: flex;
    justify-content: center;
    /* Centra horizontalmente */
    align-items: center;
    /* Centra verticalmente (si es necesario) */
}
</style>
