/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {},
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true
	},
	webpack(config) {
		config.module.rules.push(
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: "graphql-tag/loader",
			}
		)
		return config
	},
}

module.exports = nextConfig
