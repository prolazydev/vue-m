import vuem from '@prolazydev/vue-m';

import '@prolazydev/vue-m/dist/vue-m.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


import './style.css';

createApp(App)
	.use(router)
	.use(vuem)
	.mount('#app');
