"use client";
import { refThemeButton } from "@/app/_components/ThemeButton";
import { isJson } from "@/lib/isJSON";
import React, { ReactEventHandler, ReactNode, useEffect, useRef, useState } from "react";

let height: number;
const localStorageTag = 'darkMode'

export default function ThemeHandler({
	children
}:{
	children:ReactNode
}) {
	const [darkMode, setDarkMode] = useState<boolean>()
	const buttonLoaded = useRef<boolean>(false);
	const themeLoaded = useRef<boolean>(false);
	const refThemeHandler = useRef<HTMLDivElement>(null)

	useEffect(() => {
		refThemeHandler.current?.classList.remove('hidden')
	}, [refThemeHandler])

	useEffect(() => {
		initTheme();
	}, [global.window]);

	useEffect(() => {
		initButton();
	}, [refThemeButton]);

	useEffect(() => {
		switchTheme();
	}, [darkMode])

	function initButton() {
		if (!buttonLoaded.current) {
			if (refThemeButton.current) refThemeButton.current.checked = getDefaultTheme();

			refThemeButton.current?.addEventListener("click", function () {
				setDarkMode(refThemeButton.current!.checked)
			})
			buttonLoaded.current = true;
		}
	}

	function initTheme() {
		if (!themeLoaded.current) {
			const isDefaultDark = getDefaultTheme();
			setDarkMode(isDefaultDark);

			height = global.window.innerHeight;
			setSize();
			global.window.addEventListener('resize', setSize);
			themeLoaded.current = true;
		}
	}

	function getDefaultTheme(): boolean {
		const darkModePrefQuery = global.window.matchMedia("(prefers-color-scheme: dark)");
		const localDarkModePref = localStorage.getItem(localStorageTag);
		const isDefaultDark = (localDarkModePref && isJson(localDarkModePref)) ? JSON.parse(localDarkModePref) : darkModePrefQuery.matches;

		return isDefaultDark;
	}

	function switchTheme() {
		localStorage.setItem(localStorageTag, JSON.stringify(darkMode));
		global.document.body.classList[darkMode ? 'add' : 'remove']('dark');
	}

	function setSize() {
		const isMobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

		if (!isMobile) height = window.innerHeight;
		const vh = height * 0.01;

		global.document.documentElement.style.setProperty('--vh', `${vh}px`);
	}

	return (
		<div ref={refThemeHandler} className="hidden">
			{children}
		</div>
	)
}

