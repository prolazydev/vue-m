<template>
	<Transition name="showcase" mode="out-in" :duration="500">
		<div v-if="showcase" class="p-5 flex mt-auto w-screen">
			<footer>
				<div class="footer-left flex items-center">
					<p>
						Made with 
						<span class="grayscale hover:grayscale-0 cursor-default transition-all">
							💚
						</span> 
						by 
						<a class="text-gray-600 hover:text-gray-950 transition-colors" href="https://github.com/prolazydev" target="_blank" rel="noopener noreferrer">
							prolazydev
						</a> 
					</p>
				</div>

				<img class="vue-m-logo" src="/vue-m.svg" />
				
				<div class="hr-line-footer">
					<hr class="">
				</div>

				<div class="footer-right">
					<h4 class="text-xl">Contacts</h4>
					<a class="text-gray-600 hover:text-gray-950 transition-colors" href="mailto:flamur.biz@hotmail.com">flamur.biz@hotmail.com</a>
					<div class="footer-links flex gap-3">
						<a class="flex" href="https://www.linkedin.com/in/flamurfazliu/" target="_blank" rel="noopener noreferrer">
							<svg class="w-8 h-auto text-gray-600 hover:text-sky-700 transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect x="0" y="0" width="20" height="20" fill="none" stroke="none" /><path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4zM7.65 13.979H5.706V7.723H7.65v6.256zm-.984-7.024c-.614 0-1.011-.435-1.011-.973c0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973zm8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355c-.537 0-.856.371-.997.728c-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01c1.279 0 2.238.857 2.238 2.699v3.699z"/></svg>
						</a>
						<a class="flex" href="https://github.com/prolazydev" target="_blank" rel="noopener noreferrer">
							<svg class="w-8 h-auto text-gray-600 hover:text-gray-950 transition-colors" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect x="0" y="0" width="20" height="20" fill="none" stroke="none" /><path fill="currentColor" d="M10.015 9.949h-.03c-1.191 0-2.24-.303-2.861.268a1.57 1.57 0 0 0-.527 1.197c0 1.852 1.483 2.08 3.389 2.08h.029c1.905 0 3.389-.229 3.389-2.08c0-.443-.156-.856-.527-1.197c-.622-.571-1.671-.268-2.862-.268zM8.393 12.48c-.363 0-.656-.408-.656-.91s.293-.908.656-.908c.363 0 .657.406.657.908c.001.502-.293.91-.657.91zm3.213 0c-.363 0-.657-.408-.657-.91s.294-.908.657-.908c.362 0 .656.406.656.908c.001.502-.293.91-.656.91zM10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4zm.876 13.539c-.172 0-.514 0-.876.002c-.362-.002-.704-.002-.876-.002c-.76 0-3.772-.059-3.772-3.689c0-.834.286-1.445.755-1.955c-.074-.184-.078-1.232.32-2.236c0 0 .916.1 2.301 1.051c.289-.081.781-.122 1.272-.122s.982.041 1.273.121c1.385-.951 2.301-1.051 2.301-1.051c.398 1.004.395 2.053.32 2.236c.469.51.755 1.121.755 1.955c-.001 3.632-3.013 3.69-3.773 3.69z"/></svg>
						</a>
						<a class="flex" href="https://www.npmjs.com/package/@prolazydev/vue-m" target="_blank" rel="noopener noreferrer">
							<svg class="w-8 h-auto text-gray-600 hover:text-[#cb3837] transition-colors" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="none" stroke="currentColor" d="M4.5 10.5v2h2v-2h8v-6H.5v6h4Zm0 0v-6m4 0v6M6.5 6v3m-4-3v4.5m8-4.5v4.5m2-4.5v4.5"/></svg>
						</a>
					</div>
				</div>
			</footer>
		</div>
	</Transition>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const showcase = ref(false);

onMounted(() => {
	document.addEventListener('toggleShowcase', () => showcase.value = !showcase.value)
});
</script>

<style>
@import url('../assets/index.css');

footer {
	@apply w-4/5 h-auto m-auto p-10 flex justify-between shadow-lg border-[6px] hover:shadow-none transition-shadow backdrop-blur-sm;
}

.vue-m-logo {
	@apply absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] w-32 h-auto grayscale hover:grayscale-0 transition-all duration-500;
}

.footer-right {
	@apply flex flex-col gap-3;
}

.hr-line-footer {
	@apply w-full;
	display: none;
}

.hr-line-footer hr {
	@apply m-auto mt-3 border-t-[6px] border-dashed;
}

@media screen and (max-width: 855px) {
	footer {
		@apply w-full
	}
}
@media screen and (max-width: 655px) {
	footer {
		@apply flex-col justify-center items-center gap-5
	}
	
	.vue-m-logo {
		@apply relative left-0 top-0 translate-x-0 translate-y-0
	}
	
	.footer-right {
		@apply w-full h-[64px] flex-wrap items-baseline justify-end content-between
	}
}
@media screen and (max-width: 446px) {
	.hr-line-footer {
		display: block;
	}

	footer {
		@apply flex-col-reverse gap-5;
		height: auto;
	}
	.footer-left {
		@apply mb-0
	}
	.footer-right {
		@apply h-auto
	}
	
}
@media screen and (max-width: 298px) {
	

	.footer-right {
		@apply overflow-hidden
	}

	.footer-right a {
		width: 100%;
    	overflow: scroll;
		-ms-overflow-style: none;  /* IE and Edge */
  		scrollbar-width: none;  /* Firefox */
	}

	.footer-right a::-webkit-scrollbar {
		display: none;
	}
}

</style>
