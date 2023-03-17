/*
Nuxt 3 Plugin providing helpers to convert anything
to kebap-case, snake_case, camelCase or PascalCase.
---------------------------------------------------

Usage as helper in script setup:
   const {$toKebabCase, $toSnakeCase, $toCamelCase, $toPascalCase} = useNuxtApp()
   console.log($toKebabCase('My String'))    // Outputs: my-string
   console.log($toSnakeCase('My String'))    // Outputs: my_string
   console.log($toCamelCase('My String'))    // Outputs: myString
   console.log($toPascalCase('My String'))   // Outputs: MyString

Usage as helper in template:
   <my-component :my-prop="$toKebabCase('My String')" />

*/
export default defineNuxtPlugin(() => {
	const toKebabCase = (string: string): string =>
		string
			.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
			.map((x) => x.toLowerCase())
			.join('-')

	const toSnakeCase = (string: string): string => toKebabCase(string).replace('-', '_')

	const toCamelCase = (string: string): string =>
		string.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

	const toPascalCase = (string: string): string =>
		string
			.toLowerCase()
			.replace(new RegExp(/[-_]+/, 'g'), ' ')
			.replace(new RegExp(/[^\w\s]/, 'g'), '')
			.replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
			.replace(new RegExp(/\w/), (s) => s.toUpperCase())

	return {
		provide: {
			toKebabCase,
			toSnakeCase,
			toCamelCase,
			toPascalCase,
		},
	}
})
