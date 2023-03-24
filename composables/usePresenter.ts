export const usePresenter = () => {
	const { t } = useI18n()
	const processorName = (processor: Processor) => {
		return processor.name + ', ' + processor.country
	}
	const processTitle = (process: DataProcessing, category: DataProcessingCategory) => {
		const serviceName =
			process.service && process.service.length > 0
				? process.service
				: t('settings.data_processings.categories.' + category + '.title')

		return (
			serviceName +
			' (' +
			t('general.provided_by') +
			' ' +
			processorName(process.processor) +
			')'
		)
	}
	const stringLimit = (string: string, maxChars: number) => {
		if (string.length > maxChars) {
			return string.substring(0, maxChars) + '...'
		}
		return string
	}
	const dataCategories = (dataCategories: DataCategory[]) =>
		dataCategories
			.map((category) =>
				t(`settings.data_processings.fields.data_categories.options.${category}.title`)
			)
			.join(', ')

	return { processorName, processTitle, stringLimit, dataCategories }
}
