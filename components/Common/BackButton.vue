<template>
    <el-button v-show="visibleBackButton" circle @click="goToPrev()">
        << </el-button>
</template>

<script setup lang="ts">

const visibleBackButton = ref(true);
const route = useRoute();

visibleBackButton.value = route.path !== '/';

watch(
    () => route.path,
    () => {
        console.log(visibleBackButton.value);
        console.log(route.path);
        visibleBackButton.value = route.path !== '/';
    }
);

const router = useRouter();

const goToPrev = () => {
    router.go(-1);
}

</script>

<style scoped></style>