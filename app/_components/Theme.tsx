"use client";
import { refThemeButton } from "@/app/_components/ThemeButton";
import React from "react";

let height = window.innerHeight;

export default function Theme() {
	
	setSize();
	window.addEventListener('resize', setSize);

	getDefaultTheme()

	return (
		<></>
	)
}

function setSize() {
	const isMobile = (/Mobi|Android/i.test(navigator.userAgent)) ? true : false;

	if (!isMobile) height = window.innerHeight;
	const vh = height * 0.01;

	global.document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export function getDefaultTheme() {
	const themeTest = global.matchMedia("(prefers-color-scheme: light)");
	const systemTheme = themeTest.matches ? 'light' : 'dark';

	const userPreference = localStorage.getItem('preferredTheme');
	const defaultTheme = userPreference ? userPreference : systemTheme;
	global.document.documentElement.classList[defaultTheme === 'dark' ? 'add' : 'remove']('dark');

	return defaultTheme;
}

export function switchTheme() {
	const themeState = refThemeButton.current?.checked ? 'dark' : 'light';
	localStorage.setItem('preferredTheme', themeState);
	localStorage.setItem('theme', themeState);
	global.document.documentElement.classList[themeState === 'dark' ? 'add' : 'remove']('dark');
	console.log(refThemeButton.current?.checked)

	// if (refThemeButton.current) refThemeButton.current.checked = theme === 'dark'
}