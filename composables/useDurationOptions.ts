type Minutes = number
type DurationOptions = {
	'1_hour': Minutes
	'24_hours': Minutes
	'1_week': Minutes
	'2_weeks': Minutes
	'1_month': Minutes
	'3_months': Minutes
	'6_months': Minutes
	'1_year': Minutes
	'13_months': Minutes
	'2_years': Minutes
	'30_years': Minutes
}
export const useDurationOptions = (): DurationOptions => {
	return {
		'1_hour': 60,
		'24_hours': 1440,
		'1_week': 10080,
		'2_weeks': 20160,
		'1_month': 43800,
		'3_months': 131400,
		'6_months': 262800,
		'1_year': 525600,
		'13_months': 569401,
		'2_years': 1051200,
		'30_years': 15768000,
	}
}
