<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const getStyle = (ratio: number): string => `transform:translateY(-${y.value * ratio}px)`
</script>
<template>
	<div class="parallax-bg">
		<div :style="getStyle(0.3)"></div>
	</div>
</template>
<style scoped>
.parallax-bg {
	@apply absolute bottom-0 left-0 right-0 top-0 overflow-hidden;

	box-shadow: inset 0 -20px 30px 0px rgb(0 0 0 / 30%);

	div {
		@apply fixed bottom-0 left-0 right-0 top-0;

		transform: translateY(0);
		background-size: 100%;

		background-image: url('/background.png');
		background-attachment: fixed;
		background-repeat: no-repeat;
	}
}
</style>
