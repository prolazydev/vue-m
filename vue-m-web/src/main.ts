import mul from '@prolazydev/vue-m';

import '@prolazydev/vue-m/dist/vue-m.css';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App)
	.use(mul)
	.mount('#app');
