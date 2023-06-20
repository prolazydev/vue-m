<template>
	<div class="p-12" :class="(!showcase) ? 'min-h-screen' : 'main'">
		<Transition name="showcase" :duration="duration" mode="out-in" appear>
			<div v-if="!showcase" @click="toggleShowcase" :class="{ 'showcase-showing': showcase }"
				class="toggle-playground">
				<button>Toggle Playground</button>
				<button>Toggle Playground</button>
			</div>
		</Transition>
		<Transition name="showcase" mode="out-in" :duration="duration">
			<div v-if="showcase" class="flex flex-col gap-16 relative">
				<Teleport to="#app">
					<button @click="toggleShowcase" class="test-toggle  ">
						<svg class="absolute w-8 h-auto text-white top-[-70px] left-[-38px]" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><mask id="ipSBack0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168c-3.797-.805-7.412-.927-10.846-.365V41L4 23.545L20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833c4.445 4.505 7.009 10.117 7.69 16.836Z" clip-rule="evenodd"/></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSBack0)"/></svg>
					</button>
				</Teleport>

				<div class="main-title transition-opacity">
					<h1 id="mainTitle"></h1>
				</div>

				<div class="hr-line  transition-opacity">
					<hr class="w-4/5 m-auto mt-3 border-t-[6px] border-dashed">
				</div>
				<div class="ui-elements">
					<div id="btn_el" class="m-el m-input-el">
						<p class="m-el-name">
							Button
						</p>
						<m-btn :color='color?.color'
						:text-color="(color.color.startsWith('#') || color.color.startsWith('rgb')) ? 'light' : ''" >
							{{ color?.name }}
						</m-btn>
					</div>
					<div class="m-el" text-color="#fff">
						<p class="m-el-name">Input</p>
						<div class="flex flex-col gap-2 justify-center">
							<div class="flex flex-col gap-2 text-sm">
								<div class="flex gap-2 items-center">
									<m-switch @click="togglePassword" size="sm" v-model="isPassword" id="togglePassword" />
									<label for="togglePassword">Password</label>
								</div>
								<div class="flex gap-2 items-center">
									<m-switch @click="toggleEmail" size="sm" v-model="isEmail" id="toggleEmail" />
									<label for="toggleEmail">Email</label>
								</div>
								<div v-if="isEmail" class="flex gap-2 items-center">
									<m-switch @click="isPersistentValidation = !isPersistentValidation" size="sm"
										v-model="isPersistentValidation" id="togglePersistentValidation" />
									<label for="togglePersistentValidation">Persistent Validation</label>
								</div>
							</div>
							<m-input id="test" 
									v-model="inputShowcaseValue" 
									:type="inputType" 
									size="md" 
									icon="user"
									placeholder="Type something :>" 
									:persistentValidation="isPersistentValidation"
									auto-focus=true />
							<input class="text-base placeholder:text-center bg-transparent" v-model="inputShowcaseValue"
								type="text" readonly disabled>
						</div>
					</div>

					<div class="m-el">
						<p class="m-el-name">Switch</p>
						<div class="flex flex-col gap-2 justify-center items-center">
							<m-switch v-model="switchVal" />
							<p @click="switchVal = true">{{ switchVal }}</p>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { bgMouseTracking, colors, titleText, typeText } from '../utils';
import { Color } from '../types';

const duration = 500;

const showcase = ref(false);

const color = ref<Color>({ name: 'default', color: 'default' });
const elIntervalId = ref<NodeJS.Timer>();
const switchVal = ref<boolean>(false);

const inputShowcaseValue = ref('');

const isPassword = ref(false);
const isEmail = ref(false);
const isPersistentValidation = ref(false);

const inputType = ref('text');

const eToggleShowcase = new Event('toggleShowcase');

onMounted(() => {
	bgMouseTracking();
	// TODO: #2f4f4f for the light bg on input
});

function toggleShowcase() {
	document.dispatchEvent(eToggleShowcase);

	showcase.value = !showcase.value;
	if (showcase.value) 
		setTimeout(() => {
			const mainTitle = document.getElementById('mainTitle')!;

			typeText(titleText, mainTitle, 30);

			const uiElements = document.getElementsByClassName('m-el')!;
			const btn_el = document.getElementById('btn_el')!;
			btn_el.onmouseenter = () => {
				let currentIndex = 0;
				elIntervalId.value = setInterval(() => {
					color.value = colors[ currentIndex ];
					currentIndex = (currentIndex + 1) % colors.length;
				}, 2500);
			};
			for (let i = 0; i < uiElements.length; i++)
				uiElements[ i ].addEventListener('mouseleave', () => clearInterval(elIntervalId.value));
		}, 1350);
}

function togglePassword() {
	if (!isPassword.value)
		inputType.value = 'password';
	else
		inputType.value = 'text';

	isEmail.value = false;
	isPassword.value = !isPassword.value;
}
function toggleEmail() {
	if (!isEmail.value)
		inputType.value = 'email';
	else
		inputType.value = 'text';
	isPassword.value = false;
	isEmail.value = !isEmail.value;
}
</script>

<style>
@import url('../assets/index.css');

</style>