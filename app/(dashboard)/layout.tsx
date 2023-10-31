import Header from '@components/Header'
import '@styles/globals.css'

import { Inter } from 'next/font/google'
import Head from '@dashboard/head'
import ThemeHandler from '@/app/_components/Theme';

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
					<div className='fixed top-0 w-full select-none pointer-events-none h-24 z-10 bg-gradient-to-b from-primary-bg to-transparent
						after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary-bg after:to-transparent'></div>
					<div className='fixed bottom-0 w-full select-none pointer-events-none h-24 z-10 bg-gradient-to-t from-primary-bg to-transparent
						after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary-bg after:to-transparent'></div>
					<main>
						{children}
					</main>
				</ThemeHandler>
			</body>
			

		</html>
	)
}


