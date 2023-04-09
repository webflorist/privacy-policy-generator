<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const getStyle = (ratio: number): string => `transform:translateY(-${y.value * ratio}px)`
</script>
<template>
	<div class="parallax-bg">
		<div class="background" :style="getStyle(0.3)"></div>
		<div class="flower-ornament" :style="getStyle(0.1)"></div>
	</div>
</template>
<style scoped>
.parallax-bg {
	@apply absolute bottom-0 left-0 right-0 top-0 overflow-hidden;

	box-shadow: inset 0 -20px 30px 0px rgb(0 0 0 / 30%);
	clip-path: inset(0 0 0 0);

	div {
		@apply fixed bottom-[-1000px] left-0 right-0 top-[60px];

		transform: translateY(0);
		transition: transform 0.4s;
		transition-timing-function: ease-out;
		background-attachment: fixed;
		background-repeat: no-repeat;
	}

	.background {
		background-image: url('/background.png');

		background-size: 1000px;

		@screen lg {
			background-size: 100%;
		}
	}

	.flower-ornament {
		@apply drop-shadow-lg;
		
		background-image: url('/flower-ornament.svg');
		background-position-x: right;
		background-size: 55vw;
		display: none;
		opacity: 0.8;

		@screen xs {
			background-size: 45vw;
		}

		@screen sm {
			background-size: 35vw;
			display: block;
		}
	}
}
</style>
