import { processors } from '@webflorist/privacy-policy-text'
export const useDefaultProcessors = (): Processor[] => {
	return processors.sort((a: Processor, b: Processor) =>
		a.name.localeCompare(b.name)
	)
}
