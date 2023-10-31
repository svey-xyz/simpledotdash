"use client";
import { ThemeProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react';

export default function ThemeHandler({
	children
}:{
	children:ReactNode
}) {
	const [height, setHeight] = useState<number>()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true);
		setSize();
		window.addEventListener('resize', () => {
			setSize();
		})
	}, [])

	function setSize() {
		const isMobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

		if (!isMobile) setHeight(window.innerHeight);
		const vh = height ? setHeight(height * 0.01) : 0;

		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	return (
		<ThemeProvider attribute="class">
			{children}
		</ThemeProvider>
	)
}

