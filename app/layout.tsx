import { Header } from '@components/Banners'
import '@styles/globals.css'


import Head from './head'
import ThemeHandler from '@components/ThemeHandler';



export const metadata = {
	title: '',
	description: "Generic description.",
	keywords: ['Next.js', 'React', 'JavaScript'],
	authors: [{ name: 'svey', url: 'https://svey.xyz' }],
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<html lang="en" className={``} suppressHydrationWarning>
			<Head />
			<body>
				<ThemeHandler>
					<Header />
					<main>
						{children}
					</main>
				</ThemeHandler>
			</body>
			

		</html>
	)
}


