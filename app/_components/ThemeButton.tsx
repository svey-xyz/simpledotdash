"use client"; // Required to set the onClick.

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import React from "react";

export function ThemeButton({ theme }: { theme: string }) {
	const changeTheme = () => {
		document.body.classList.contains('dark') ?
			document.body.classList.remove('dark') :
			document.body.classList.add('dark')
	}
	return (
		<label className="group cursor-pointer relative flex items-center justify-center leading-xs w-icon h-icon" >
			<input onClick={changeTheme}
				aria-label="Theme Switcher" id="themeSwitcher" type="checkbox" defaultChecked={theme == "dark" ? true : false}
				className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none"/>
			<SunIcon className="text-opposite-bg relative w-[80%] block peer-checked:!hidden duration-100 group-hover:scale-[1.3]" />
			<MoonIcon className="text-opposite-bg relative w-[80%] !hidden peer-checked:!block duration-100 group-hover:scale-[1.2]" />
		</label >
	)
}

export default ThemeButton;