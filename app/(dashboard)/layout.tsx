import Header from '@components/Header'
import '@styles/globals.css'

import { Inter } from 'next/font/google'
import Head from '@dashboard/head'
import { cookies } from 'next/headers';

// import localFont from "next/font/local";

const inter = Inter({ subsets: ['latin'] })
// const firaCode = localFont({
// 	src: "../_public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
// 	variable: "--font-montserrat",
// });

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
	const defaultTheme = "dark";
	const cookieValue = cookies().get("theme")?.value || "";
	const isTheme = cookieValue === "dark" || cookieValue === "light";
	const theme = isTheme ? cookieValue : defaultTheme;
	// const theme: themeType = 'light';


	let documentClasses = `${theme ? theme as string : ''} ${inter.className}`

	return (
		<html lang="en">
			<Head />
			<body className='dark relative min-h-screen'>
				<Header />
				<div className='fixed top-0 w-full select-none pointer-events-none h-48 z-10 bg-gradient-to-b from-primary-bg to-transparent
					after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary-bg after:to-transparent'></div>
				<div className='fixed bottom-0 w-full select-none pointer-events-none h-48 z-10 bg-gradient-to-t from-primary-bg to-transparent
					after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary-bg after:to-transparent'></div>
				<main className='mb-24 min-h-full'>
					{children}
				</main>
			</body>
		</html>
	)
}


