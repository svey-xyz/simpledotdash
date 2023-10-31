"use client";

export let refThemeButton: RefObject<HTMLInputElement>


import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import React, { RefObject, useRef } from "react";

export function ThemeButton() {
	
	refThemeButton = useRef<HTMLInputElement>(null)

	return (
		<label className="group cursor-pointer relative flex items-center justify-center leading-xs w-icon h-icon" >
			<input id='themeSwitcher' aria-label="Theme Switcher" type="checkbox" ref={refThemeButton}
				className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none"/>
			<SunIcon className="text-primary-text relative w-[80%] block peer-checked:!hidden duration-100 group-hover:scale-[1.3]" />
			<MoonIcon className="text-primary-text relative w-[80%] !hidden peer-checked:!block duration-100 group-hover:scale-[1.2]" />
		</label >
	)
}

export default ThemeButton;