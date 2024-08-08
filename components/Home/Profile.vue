<template>
    <div class="container">
        <el-row>
            <el-col :span="6">
                <span class="week">SEMANAS</span><br />
                <span class="time">5</span><br />
                <span class="week">SIN FALTAR</span>
            </el-col>

            <el-col class="profile" :span="12">
                <el-avatar :size="200"
                    src='https://img.freepik.com/premium-vector/strong-man-vetor-icon-logo-fitness-centre-bodybuilder-concept-illustration_683738-3235.jpg' />
            </el-col>

            <el-col :span="6">
                <el-row class="info">
                    <el-col :span="24">
                        <span class="number">32</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="label">años</span>
                    </el-col><el-col :span="24">
                        <span class="number">85</span></el-col>
                    <el-col :span="24">
                        <span class="label">Kg</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="name">
                    GERMAN STARK
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}

.container {
    width: 100%px;
    border-radius: 20px;
    text-align: center;
}

.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.week {
    font-size: 1em;
    text-align: left;
    font-weight: bold;
}

.time {
    font-size: 7em;
    color: #ff3366;
    font-weight: bold;
}

.info {
    justify-content: center;
    align-items: center;
    height: 100%;
}

.info .number {
    font-size: 2.5em;
    font-weight: bold;
}

.info .label {
    font-size: 1em;
}

.name {
    font-size: 2.5em;
    font-weight: bold;
}
</style>