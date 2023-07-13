import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'vue-material-design-icons/styles.css'


createApp(App).use(router).mount('#app').$nextTick(() => postMessage({ payload: 'removeLoading' }, '*'))
