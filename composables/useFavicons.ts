export const useFavicons = () => {
	useHead({
		meta: [
			{
				name: 'msapplication-TileColor',
				content: '#aa191e',
			},
			{
				name: 'theme-color',
				content: '#ffffff',
			},
		],
		link: [
			{
				rel: 'icon',
				type: 'image/svg+xml',
				href: '/favicon.svg',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png',
			},
			{
				rel: 'manifest',
				href: '/site.webmanifest',
			},
		],
	})
}
