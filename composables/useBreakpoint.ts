export const useBreakpoint = () => {
	type Breakpoint = null | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
	type BreakpointStatus = {
		xs: boolean | null
		sm: boolean | null
		md: boolean | null
		lg: boolean | null
		xl: boolean | null
		'2xl': boolean | null
	}
	const breakpoints = {
		xs: 475,
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		'2xl': 1536,
	}

	const screenWidth = ref(1024)

	const current = ref<Breakpoint>(null)

	const min = reactive<BreakpointStatus>({
		xs: null,
		sm: null,
		md: null,
		lg: null,
		xl: null,
		'2xl': null,
	})

	const max = reactive<BreakpointStatus>({
		xs: null,
		sm: null,
		md: null,
		lg: null,
		xl: null,
		'2xl': null,
	})

	watch(
		screenWidth,
		() => {
			let newCurrent = null
			for (const key in breakpoints) {
				min[key] = screenWidth.value >= breakpoints[key]
				max[key] = screenWidth.value < breakpoints[key]
				if (screenWidth.value >= breakpoints[key]) {
					newCurrent = key
				}
			}
			current.value = newCurrent
		},
		{ immediate: true }
	)

	if (process.client) {
		screenWidth.value = window.innerWidth
		window.addEventListener('resize', () => {
			screenWidth.value = window.innerWidth
		})
	}

	return {
		current,
		min,
		max,
	}
}
