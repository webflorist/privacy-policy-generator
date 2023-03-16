import humanizeDuration, { HumanizerOptions } from 'humanize-duration'
export const useHumanizedDuraition = () => {
	const { locale } = useI18n()

	const humanizeMinutes = (minutes: number) =>
		humanizeDuration(minutes * 60000, { language: locale.value })
	return {
		humanizeDuration,
		humanizeMinutes,
	}
}
