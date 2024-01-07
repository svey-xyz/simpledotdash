import Header from '@components/Header'
import '@styles/globals.css'

import { Inter } from 'next/font/google'
import Head from '@/app/head'
import ThemeHandler from '@components/Theme';

const inter = Inter({ subsets: ['latin'] })

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
		<html lang="en" className={`${inter.className}`} suppressHydrationWarning>
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

