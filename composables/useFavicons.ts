export const useFavicons = () => {
	useHead({
		meta: [
			{
				name: 'msapplication-TileColor',
				content: '#9f00a7',
			},
			{
				name: 'theme-color',
				content: '#4a148c',
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
