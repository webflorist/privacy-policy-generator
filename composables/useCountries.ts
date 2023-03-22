import { getNames, registerLocale, getName } from 'i18n-iso-countries'
import de from 'i18n-iso-countries/langs/de.json'
import en from 'i18n-iso-countries/langs/en.json'
export const useCountries = () => {
	const { locale: currentLocale } = useI18n()

	registerLocale(de)
	registerLocale(en)

	type Locale = 'de' | 'en'

	type CountryOption = {
		title: string
		value: string
	}

	const getOptions = (locale: Locale = currentLocale.value) => {
		const names = getNames(locale, { select: 'official' })
		const countryList = []
		for (const [code, country] of Object.entries(names)) {
			countryList.push({
				title: country,
				value: code,
			})
		}
		return countryList
	}

	const getCountryName = (code: string, locale: Locale = currentLocale.value) =>
		getName(code, locale, { select: 'official' })

	return { getOptions, getCountryName }
}
