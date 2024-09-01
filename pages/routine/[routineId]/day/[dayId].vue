<template>
    <div v-loading="loading">
        <h1>
            {{ routine.title }}
        </h1>
        <el-collapse accordion>
            <el-collapse-item v-for="r in routineDay.blocks" :key="r.id" :name="r.id">
                <template #title>
                    <p><b class="blockItemTitle">{{ r.title }}</b>
                        <span v-if="r.type !== 'tabata'">
                            {{ r.description?.length == 0 ? '' : '- ' +
                                r.description
                            }}
                        </span>
                        <span v-else>
                            {{ ' ' + r.series + ' series x ' + r.round + ' rondas - '
                                + r.restBetweenSeries + ' de pausa.' }}
                        </span>
                    </p>
                </template>
                <div>
                    <RoutineWorkoutBlock :workoutBlock="r" />
                </div>
            </el-collapse-item>
        </el-collapse>
        <el-button color="#626aef" @click="openReview()">
            Copiar Resumen
        </el-button>
    </div>
    <el-dialog v-model="dialogTableVisible" title="Resumen del día" width="800">
        <p v-for="r in review">
            <b v-if="r.isTitle">{{ r.title }}</b>
        <p v-else>{{ r.title }}</p>
        </p>
        <el-button type="primary" :icon="DocumentCopy" @click="copyText()"
            :disabled="review.length === 0">Copiar</el-button>
    </el-dialog>
</template>

<script setup lang="ts">
import type { RoutineDay } from '~/interface/routineDay.type';
import { useRoutinesStore } from '~/stores/routines';
import { DocumentCopy } from '@element-plus/icons-vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'


const { routineId, dayId } = useRoute().params;

const { loadRoutineDay, routine } = useRoutinesStore();

const loading = ref(true);

const routineDay: RoutineDay = reactive({
    id: 0,
    title: '',
    completed: false,
    blocks: []
});

onMounted(() => {
    const day = loadRoutineDay(Number(routineId), Number(dayId));
    Object.assign(routineDay, day);
    loading.value = false;
});

const review = ref([{}]);
let reviewString = ref('');
const { copy } = useClipboard({ reviewString });

const dialogTableVisible = ref(false)
const openReview = () => {
    dialogTableVisible.value = true;
    createReview();
};

const copyText = () => {
    if (review.value.length > 0) {
        reviewString.value = '';
        review.value.forEach(r => {
            let text = '';
            if (r.isTitle)
                text = `\n*${r.title}*`;
            else if (r.isFeedback)
                text = `\n_${r.title}_`;
            else
                text = `\n${r.title}`;
            reviewString.value += text + '\n';
        });
        copy(reviewString.value);
        ElMessage({
            message: 'Copiado!',
            type: 'success',
        })
    }
};

const createReview = () => {
    review.value = [];
    review.value.push({
        "title": routineDay.title,
        "isTitle": true
    });
    routineDay.blocks.forEach(block => {
        if (block.skipEffort !== true) {
            review.value.push({
                "title": block.title,
                "isTitle": true
            });
            block.excercises.forEach(ex => {
                if (ex.effort) {
                    var eff = '';
                    for (let index = 0; index < ex.effort; index++) {
                        eff = eff + '⭐';
                    }
                    review.value.push({
                        "title": ex.title + " - Esf: " + eff
                    });
                }
                if (ex.feedback) {
                    review.value.push({
                        "title": ex.feedback,
                        "isFeedback": true
                    });
                }
            });
        }
    });
};

</script>

<style scoped>
.blockItemTitle {
    font-size: medium;
    font-weight: bold;
}


.blockItem p {
    font-size: medium;
}
</style>