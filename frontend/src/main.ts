import { createApp } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import App from './App.vue';
import router from './router';
import { store, key } from './lib/store';

const app = createApp(App);
app.use(store, key);
app.use(ElMessage);
app.use(router);
app.mount('#app');
