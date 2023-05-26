<template>
	<div class="main">
		<div class="main-title">
			<h1 id="mainTitle"></h1>
		</div>
		<div class="ui-elements m-auto w-4/5 flex flex-wrap gap-4">
			<div ref=btn_el class="m-el m-input-el ">
				<p 	class="cursor-pointer underline-offset-[6px] underline hover:underline-offset-2 select-none transition-all duration-[250ms]">
					Button
				</p>
				<m-btn 	:color='color?.color'
						:text-color="(color.color.startsWith('#') || color.color.startsWith('rgb')) ? 'light' : ''">
					{{ color?.name }}
				</m-btn>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { bgMouseTracking, colors, titleText, typeText } from './utils';
import { Color } from './types';

const color = ref<Color>({ name: 'default', color: 'default' });
const btn_el = ref<HTMLButtonElement>();
const elIntervalId = ref(-1);

onMounted(() => {
	const mainTitle = document.getElementById('mainTitle')!;
	const uiElements = document.getElementsByClassName('m-el')!;

	bgMouseTracking();
	setTimeout(() => {
		typeText(titleText, mainTitle, 30);
	}, 1350);

	btn_el.value!.onmouseenter = () => {
		let currentIndex = 0;
		elIntervalId.value = setInterval(() => {
			color.value = colors[ currentIndex ];
			currentIndex = (currentIndex + 1) % colors.length;
		}, 2500);
	};

	for (let i = 0; i < uiElements.length; i++) 
		uiElements[ i ].addEventListener('mouseleave', () => clearInterval(elIntervalId.value));
});

</script>

<style>
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
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

	height: 107px;
	padding: 0rem;
	margin: auto;

	display: flex;

	font-size: 2rem;
	text-align: center;
	text-shadow:
		2px 2px 0px #7bf09a,
		4px 4px 10em blue,
		6px 6px 10em red;

	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

	animation: openTitle 1s ease-in-out 0.25s 1 normal forwards;
}

@keyframes openTitle {
	from {
		width: 0px;
		padding: 0rem;
	} to {
		width: 452.2px;
		padding: 2rem;
	}
}
</style>