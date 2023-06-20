import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: "Home"
			}
		}
	]
});

// TODO: router guard?
// const brandName = '';

// router.beforeEach((to, from, next) => {

// 	next();
// });

export default router;