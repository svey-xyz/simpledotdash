import Title from "@/components/Title";
import UserButton from "@/components/UserButton";
import { fetcher, updater } from "@/lib/data.fetch.client";
import db from "@lib/db";
import React, { FormEvent } from "react";

export default async function Header() {
	const settings = await db.settings.findFirst()

	return (
		<header className='relative top-0 left-0 right-0 max-w-screen h-fit'>
			<div className="relative h-full flex flex-col items-center justify-center pt-12">
				<div className="relative main-padding flex flex-row items-center justify-between z-50">
					<Title initialTitle={settings?.title}/>
					{/* <ThemeButton /> */}
					<UserButton />
				</div>
			</div>
		</header>
	)
}