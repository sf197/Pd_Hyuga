<script lang="ts" setup>
import { useStore } from "./lib/store";
import { isLogin, githubOauth, logout, getUserInfo } from "./lib/user";

const store = useStore();
store.state.logged = isLogin();
if (store.state.logged) {
    getUserInfo(() => { });
}

if (store.state.githubOauth == "" || store.state.githubOauth == null) {
    githubOauth();
}
const action = () => {
    if (store.state.logged) {
        logout();
    } else {
        // login with github oauth
        // location.href = store.state.githubOauth;
        location.href = "./login.html"
    }
}
</script>

<template>
    <el-sub-menu style="height: 40px;">
        <template #title>
            <el-avatar :size="20"
                :src="store.state.logged ? store.state.user.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                alt="avatar" style="margin-right: 5px;" />
            {{ store.state.logged ? store.state.user.name : 'Login' }}
        </template>
        <el-menu-item @click="action">
            {{ store.state.logged ? 'Logout' : 'AdminLogin' }}
        </el-menu-item>
    </el-sub-menu>
</template>

<style></style>
