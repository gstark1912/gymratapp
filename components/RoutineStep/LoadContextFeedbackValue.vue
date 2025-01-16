<template>
    <el-text tag="sub" size="small">{{ title }}</el-text>
    <el-input-number v-model="seriesValue">
        <template #decrease-icon>
            <el-icon>
                <ArrowDown />
            </el-icon>
        </template>
        <template #increase-icon>
            <el-icon>
                <ArrowUp />
            </el-icon>
        </template>
        <template v-if="suffix" #suffix>
            <span>{{ suffix }}</span>
        </template>
    </el-input-number>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

const props = defineProps<{
    modelValue: number,
    title: string,
    suffix?: string
}>();

const emit = defineEmits(['update:modelValue']);

const seriesValue = ref(props.modelValue);
const suffix = ref(props.suffix);

watch(seriesValue, (newValue) => {
    emit('update:modelValue', newValue);
});
</script>

<style scoped></style>