export const useUsedProcessors = (includeUtilization = false) => {
	const settings = useSettings()

	const processorList = computed<Processor[]>(() => {
		const processors: Processor[] = []
		for (const category in settings.value.dataProcessings) {
			for (const processing of settings.value.dataProcessings[category]) {
				let i = processors.findIndex((item) => item.id === processing.processor.id)
				if (i === -1) {
					const newLength = processors.push(processing.processor)
					i = newLength - 1
				}
				if (includeUtilization) {
					if (!('processing_categories' in processors[i])) {
						processors[i].processing_categories = []
					}
					if (!('data_categories' in processors[i])) {
						processors[i].data_categories = []
					}
					if (!processors[i].processing_categories?.find((item) => item === category)) {
						processors[i].processing_categories?.push(category)
					}
					processing.dataCategories.forEach((dataCategory) => {
						if (!processors[i].data_categories?.find((item) => item === dataCategory)) {
							processors[i].data_categories?.push(dataCategory)
						}
					})
				}
			}
		}
		return processors
	})
	return processorList
}
