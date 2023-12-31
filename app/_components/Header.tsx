import ThemeButton from "@/app/_components/ThemeButton";
import { getData } from "@/lib/data.fetch";
import React from "react";

export default function Header() {
	const title = getData().data?.settings.title
	return (
		<header className='relative top-0 left-0 right-0 max-w-screen h-fit'>
			<div className="relative h-full flex flex-col items-center justify-center pt-12">
				<div className="relative main-padding flex flex-row items-center justify-between z-50">
					<h1 className='w-full relative pb-4'>{title}</h1>
					<ThemeButton />
				</div>
			</div>
		</header>
	)
}