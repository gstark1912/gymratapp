<template>
    <el-dialog v-model="showDialog" title="Agregar comentario" center :fullscreen="true" destroy-on-close
        :show-close="false">
        <el-form :model="form">
            <el-form-item label="Feedback">
                <el-input v-model="form.feedback" type="textarea" :rows="8" />
            </el-form-item>
            <el-button type="success" round @click="ok()"> Guardar </el-button>
            <el-button type="danger" round @click="cancel()">Cancelar</el-button>
        </el-form>
    </el-dialog>
</template>

<script setup lang="ts">

const emit = defineEmits(['update:dialogFormVisible', 'update:feedback']);

let props = defineProps<{
    feedback: string | undefined,
    dialogFormVisible: boolean
}>();

const form = reactive({
    feedback: props.feedback
})

const showDialog = ref(props.dialogFormVisible);
watch(() => props.dialogFormVisible, (newValue) => {
    showDialog.value = newValue;
});

const ok = () => {
    emit('update:dialogFormVisible', false);
    emit('update:feedback', form.feedback);
}

const cancel = () => {
    emit('update:dialogFormVisible', false);
}

</script>
