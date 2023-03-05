export const usePresenter = () => {
	const { t } = useI18n()
	const processorName = (processor: Processor) => {
		return processor.name + ', ' + processor.country
	}
	const processTitle = (process: DataProcessing) => {
		if (process.service && process.service.length > 0) {
			return (
				process.service +
				' (' +
				t('general.provided-by') +
				' ' +
				processorName(process.processor) +
				')'
			)
		}
		return processorName(process.processor)
	}
	const stringLimit = (string: string, maxChars: number) => {
		if (string.length > maxChars) {
			return string.substring(0, maxChars) + '...'
		}
		return string
	}

	return { processorName, processTitle, stringLimit }
}
