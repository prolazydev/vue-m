<template>
	<div class="main">
		<div class="main-title">
			<h1 id="mainTitle"></h1>
		</div>
		<div class="ui-elements">
			<div class="m-el m-input-el">
				<m-btn size="xs" color='default'>Test</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn size="sm" color="info">Test sm</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn size="sm" color="success">Test sm</m-btn>
			</div>
			<div class="m-el m-btn-el">
				<m-btn size="md" color="indigo">Login</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn size="lg" color="secondary" shape='square'>Test</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn size="xl" color="danger" shape="pill">Test</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn size="2xl" color="warning">Test</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn size="3xl" color="danger">Test</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn color="pink">Test</m-btn>
			</div> 
			<div class="m-el m-input-el">
				<m-btn color="light">Test</m-btn>
			</div>
			<div class="m-el m-btn-el">
				<m-btn size="md" color="indigo">Login</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn type="button" shape="" color="rgba(245, 40, 145, 0.8)">Login</m-btn>
			</div>
			<div class="m-el m-input-el">
				<m-btn color="dark">Test</m-btn>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { bgMouseTracking, typeText } from './utils';

// const titleText = 'Vue-M Component Library 😎';
const titleText = 'Vue-M Component Library &#x1F60E;';
// const shadowColors = [ 'var(--shadow-green)', 'var(--shadow-blue)', 'var(--shadow-red)' ];
// let index: number = 0;

onMounted(() => {
	bgMouseTracking();

	const mainTitle = document.getElementById('mainTitle')!;
	setTimeout(() => {
		typeText(titleText, mainTitle, 30);
	}, 1350);
});

</script>

<style scoped>
/* TODO: vue-m logo */
.vue-m-2 {
	width: 100px;
	height: auto;
}

.main {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 3rem;
}

.main-title {
	display: flex;

	height: 107px;
	padding: 0rem;

	margin: auto;

	font-size: 2rem;
	text-align: center;

	/* TODO: animate shadow for emoji */
	text-shadow: 
		2px 2px 0px #7bf09a, 
		/* 2px 2px 0px #7bf09a,  */
		4px 4px 10em  blue, 
		6px 6px 10em red; 

	/* text-shadow:
		2px 2px 0px #7bf09a,
		var(--shadow-green),
		var(--shadow-blue),
		var(--shadow-red); */

	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

	animation: openTitle 1s ease-in-out 0.25s 1 normal forwards;
}

@keyframes openTitle {
	from {
		width: 0px;
		padding: 0rem;
	}

	to {
		/* width: 492.83px; */
		width: 452.2px;
		padding: 2rem;
	}
}

.ui-elements {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}
</style>