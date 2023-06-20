<template>
	<router-view />
	<footer-layout />

	<!-- <div>width {{ test }}</div>
	<div>width {{ test2 }}</div> -->

	<!-- <div class="absolute right-0">
		current version
	</div> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FooterLayout from './layouts/FooterLayout.vue';

const test = ref(0);
const test2 = ref(0);

onMounted(() => {
	test.value = window.innerWidth;
	test2.value = document.documentElement.clientWidth;

});

</script>

<style scoped>

</style>