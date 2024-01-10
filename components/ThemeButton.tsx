"use client";

import { MoonIcon, SunIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from 'next-themes'


export function ThemeButton() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()
	const refThemeButton = useRef<HTMLInputElement>(null)

	useEffect(() => {
		setMounted(true)
		console.log('Theme: ', theme)
		if (refThemeButton.current) refThemeButton.current.checked = theme === 'dark'
	}, [])

	return (
		<label className={mounted ? "group cursor-pointer relative flex items-center justify-center leading-xs w-icon h-icon" :
			"group cursor-pointer relative flex items-center justify-center leading-xs w-icon h-icon blur-[2px]" } >
			<input id='themeSwitcher' aria-label="Theme Switcher" type="checkbox" ref={refThemeButton}
				onClick={ (e) => { if (mounted) setTheme(e.currentTarget.checked ? 'dark' : 'light') } }
				className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none"/>
			<SunIcon className="text-fg relative w-[80%] block peer-checked:!hidden duration-100 group-hover:scale-[1.3]" />
			<MoonIcon className="text-fg relative w-[80%] !hidden peer-checked:!block duration-100 group-hover:scale-[1.2]" />
		</label >
	)
}

export default ThemeButton;