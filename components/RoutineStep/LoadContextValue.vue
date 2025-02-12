<template>
    <el-statistic v-if="value.length === 1" :title="title" :value="value[0]" :suffix="suffix" />
    <div v-else>
        <el-statistic :title="title" :value="value[0]" :suffix="concatenatedValue" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    title: string;
    value: number[];
    suffix?: string;
}>();

const concatenatedValue = computed(() => '-' + (props.value.length > 1 ? props.value.slice(1).join('-') + (props.suffix ? props.suffix : '') : ''));

</script>