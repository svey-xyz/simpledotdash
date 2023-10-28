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
	const isTheme = cookieValue === defaultTheme || cookieValue === "light";
	const theme = isTheme ? cookieValue : defaultTheme;
	// const theme: themeType = 'light';


	let documentClasses = `${theme ? theme as string : ''} ${inter.className}`

	return (
		<html lang="en" className={documentClasses}>
			<Head />
			<body className='relative min-h-screen'>
				<Header />
				<main className='mb-24 min-h-full'>
					{children}
				</main>
			</body>
		</html>
	)
}


