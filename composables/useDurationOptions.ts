type Minutes = number
type DurationOptions = {
	'1_hour': Minutes
	'24_hours': Minutes
	'1_week': Minutes
	'1_month': Minutes
	'3_months': Minutes
	'6_months': Minutes
	'13_months': Minutes
	'1_year': Minutes
	'2_years': Minutes
}
export const useDurationOptions = (): DurationOptions => {
	return {
		'1_hour': 60,
		'24_hours': 1440,
		'1_week': 10080,
		'1_month': 43800,
		'3_months': 131400,
		'6_months': 262800,
		'13_months': 569401,
		'1_year': 525600,
		'2_years': 1051200,
	}
}
