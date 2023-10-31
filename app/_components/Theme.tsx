"use client";
import { refThemeButton } from "@/app/_components/ThemeButton";
import React, { ReactEventHandler, useEffect } from "react";

let height: number;

export default function Theme() {
	const [darkMode, setDarkMode] = React.useState<boolean>()
	const buttonLoaded = React.useRef<boolean>(false);

	useEffect(() => {
		initTheme();
	}, [global.document]);

	useEffect(() => {
		initButton();
	}, [refThemeButton]);

	useEffect(() => {
		switchTheme()
	}, [darkMode])

	function initButton() {
		if (!buttonLoaded.current) {
			refThemeButton.current?.addEventListener("click", function () {
				setDarkMode(refThemeButton.current!.checked)
			})
			buttonLoaded.current = true;
		}
	}

	function initTheme() {
		const defaultTheme = getDefaultTheme()
		setDarkMode(defaultTheme === 'dark')
		switchTheme()

		height = global.window.innerHeight;
		setSize();
		global.window.addEventListener('resize', setSize);
	}

	function getDefaultTheme() {
		if (!global.window) return;
		const themeTest = global.window.matchMedia("(prefers-color-scheme: light)");
		const systemTheme = themeTest.matches ? 'light' : 'dark';

		const userPreference = localStorage.getItem('preferredTheme');
		const defaultTheme = userPreference ? userPreference : systemTheme;

		return defaultTheme;
	}

	function switchTheme() {
		const themeString = darkMode ? 'dark' : 'light'
		localStorage.setItem('preferredTheme', themeString);
		localStorage.setItem('theme', themeString);
		global.document.documentElement.classList[darkMode ? 'add' : 'remove']('dark');

		// if (refThemeButton.current) refThemeButton.current.checked = theme === 'dark'
	}

	function setSize() {
		const isMobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

		if (!isMobile) height = window.innerHeight;
		const vh = height * 0.01;

		global.document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	return (
		<></>
	)
}

