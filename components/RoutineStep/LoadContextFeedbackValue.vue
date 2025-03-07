<template>
    <el-text tag="sub" size="small">{{ title }}</el-text>
    <div v-if="seriesValue != null">
        <div v-for="(value, index) in localValues" :key="index">
            <el-input-number v-model="localValues[index]" @change="updateValue" size="medium">
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
        </div>
    </div>
    <div v-else>
        <el-input-number v-model="localValue" @change="updateValue" size="medium">
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
    </div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

const props = defineProps<{
    modelValue: number | number[],
    seriesValue?: number | null, // Nuevo: Puede ser null o un número
    title: string,
    suffix?: string
}>();

const emit = defineEmits(['update:modelValue']);

const localValues = ref<number[]>([]);
const localValue = ref<number>(0);
let isArray = Array.isArray(props.modelValue);

// 🔄 Inicialización de valores cuando cambia `modelValue` o `seriesValue`
watch([() => props.modelValue, () => props.seriesValue], ([newModelValue, newSeriesValue]) => {
    if (newSeriesValue != null && newSeriesValue > 0) {
        if (Array.isArray(newModelValue)) {
            if (newModelValue.length === newSeriesValue) {
                // ✅ Si ya tiene el tamaño correcto, lo usamos tal cual
                localValues.value = [...newModelValue];
            } else if (newModelValue.length > 0) {
                // 🔥 Si tiene menos elementos, completamos con el último valor disponible
                const lastValue = newModelValue[newModelValue.length - 1];
                localValues.value = [...newModelValue, ...Array(newSeriesValue - newModelValue.length).fill(lastValue)];
            } else {
                // 🔹 Si el array está vacío, lo llenamos con 0
                localValues.value = Array(newSeriesValue).fill(0);
            }
        } else {
            // 🔹 Si `modelValue` no es un array, lo repetimos `seriesValue` veces
            localValues.value = Array(newSeriesValue).fill(newModelValue ?? 0);
        }
    }
    else {
        // Si `seriesValue` es null, usamos un solo número.
        // Si `newModelValue` es un array, tomamos el primer valor. Si no, usamos el número tal cual.
        localValue.value = Array.isArray(newModelValue) && newModelValue.length > 0 ? newModelValue[0] : newModelValue ?? 0;
    }

}, { immediate: true });

const updateValue = () => {
    if (props.seriesValue !== null) {
        emit('update:modelValue', [...localValues.value]);
    } else {
        // Si originalmente era un array, emitimos un array, sino un número
        debugger;
        emit('update:modelValue', isArray ? [localValue.value] : localValue.value);
    }
};
</script>

<style scoped></style>
