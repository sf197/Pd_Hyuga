import { createApp } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import LoginUser from './LoginUser.vue';
import { store, key } from './lib/store';

const app = createApp(LoginUser);
app.use(store, key);
app.use(ElMessage);
app.mount('#app');
