<template>
	<div class="main">
		<div class="main-title">
			<h1 id="mainTitle" class="m-test-title"></h1>
		</div>
		<div class="hr-line">
			<hr class="w-4/5 m-auto mt-3 border-t-[6px] border-dashed">
		</div>
		<div class="ui-elements m-auto w-4/5 flex flex-wrap gap-4 justify-between">
			<div ref=btn_el class="m-el m-input-el">
				<p 	class="m-el-name">
					Button
				</p>
				<m-btn 	:color='color?.color' 
						:text-color="(color.color.startsWith('#') || color.color.startsWith('rgb')) ? 'light' : ''">
					{{ color?.name }}
				</m-btn>
			</div>
			<div class="m-el">
				<p 	class="m-el-name" @click="persist = !persist">
					Input
				</p>
				<div class="flex flex-col gap-2 justify-center">
					<m-input v-model="inputShowcaseValue" id="test" type="password" 
						color="#ff4056" placeholder="Type something :>" :persistentValidation="persist" />
					<input 	class="text-base placeholder:text-center bg-transparent"
							v-model="inputShowcaseValue" type="text" readonly disabled>
				</div>
			</div>

			<div class="m-el">
				<p 	class="m-el-name">
					Switch
				</p>
				<div class="flex flex-col gap-2 justify-center items-center">
					<m-switch v-model="switchVal" />
					<p @click="switchVal = true">{{ switchVal }}</p>
				</div>
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
const elIntervalId = ref<NodeJS.Timer>();
const switchVal = ref<boolean>(false);

const inputShowcaseValue = ref('');
const persist = ref(false);
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

	// TODO: #2f4f4f for the light bg on input
});

</script>

<style scoped>
.vue-m-2 {
	width: 100px;
	height: auto;
}

.main {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 4rem;
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