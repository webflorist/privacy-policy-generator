export const usePresenter = () => {
	const settings = useSettings()
	const { t } = useI18n()
	const processTitle = (process: DataProcessing) => {
		const processorName = settings.value.processors[process.processor].name
		if (process.service && process.service.length > 0) {
			return (
				process.service +
				' (' +
				t('general.provided-by') +
				' ' +
				processorName +
				')'
			)
		}
		return processorName
	}

	return { processTitle }
}
