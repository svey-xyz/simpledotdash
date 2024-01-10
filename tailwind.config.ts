import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class',
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
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
				bg: {
					primary: `rgb(var(--primary-bg) / <alpha-value>)`,
					DEFAULT: `rgb(var(--primary-bg) / <alpha-value>)`,
					secondary: `rgb(var(--primary-bg) / <alpha-value>)`,
				},
				fg: {
					primary: `rgb(var(--primary-text) / <alpha-value>)`,
					DEFAULT: `rgb(var(--primary-text) / <alpha-value>)`,
					secondary: `rgb(var(--secondary-text) / <alpha-value>)`,
				},
				accent: {
					primary: `rgb(var(--primary-accent) / <alpha-value>)`,
					DEFAULT: `rgb(var(--primary-accent) / <alpha-value>)`,
					secondary: `rgb(var(--secondary-accent) / <alpha-value>)`,
					failure: `rgb(var(--failure-accent) / <alpha-value>)`,
					warning: `rgb(var(--warning-accent) / <alpha-value>)`,
					success: `rgb(var(--success-accent) / <alpha-value>)`,
				},

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
