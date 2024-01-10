import ThemeButton from "@components/ThemeButton";
import db from "@lib/db";
import React from "react";

export default async function Header() {
	const settings = await db.settings.findFirst()

	return (
		<header className='relative top-0 left-0 right-0 max-w-screen h-fit'>
			<div className="relative h-full flex flex-col items-center justify-center pt-12">
				<div className="relative main-padding flex flex-row items-center justify-between z-50">
					<h1 className='w-full relative pb-4'>{settings?.title}</h1>
					<ThemeButton />
				</div>
			</div>
		</header>
	)
}