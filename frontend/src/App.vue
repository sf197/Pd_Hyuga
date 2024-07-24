<script lang="ts" setup>
import { Position } from '@element-plus/icons-vue';
</script>

<template>
    <div id="app">
        <!-- 使用router-view来显示当前路由对应的组件 -->
        <router-view></router-view>
    </div>
</template>

<style>
.flex-grow {
    flex-grow: 1;
}

.footer {
    text-align: center;
}
</style>


