import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		"!./node_modules", 
	],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1200px",
			'2xl': "1440px",
		},
		extend: {
			height: {
				'icon': 'var(--icon-size)'
			},
			width: {
				'icon': 'var(--icon-size)'
			},
			maxWidth: {
				'prose-full': '85ch',
				'prose': '65ch',
				'prose-short': '45ch'
			},
			margin: {
				'1/8': '12%',
				'1/6': '16%',
				'1/7': '15%',
				'1/5': '20%',
				'1/4': '20%',
				'1/3': '33%'
			},
			colors: {
				'primary-text': 'var(--primary-text)',
				'secondary-text': 'var(--secondary-text)',
				'transparent-accent': 'var(--transparent-accent)',
				'primary-bg': 'var(--primary-bg)',
				'secondary-bg': 'var(--secondary-bg)',
				'failure-accent': 'var(--failure-accent)',
				'warning-accent': 'var(--warning-accent)',
				'success-accent': 'var(--success-accent)',
			},
			fontFamily: {
				heading: ['sans-serif'],
				body: ['sans-serif']
			},
			zIndex: {
				'-1': '-1'
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
export default config
