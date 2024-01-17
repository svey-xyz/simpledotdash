import EditableText from "@components/EditableText";
import { Button } from "@components/Settings";
import { getSettings, updateSettings } from "@lib/db.actions";
import React from "react";

export default async function Header() {
	const settings = await getSettings()

	return (
		<header className='relative top-0 left-0 right-0 max-w-screen h-fit'>
			<div className="relative h-full flex flex-col items-center justify-center pt-12">
				<div className="relative main-padding flex flex-row items-center justify-between z-50">
					<EditableText initialText={settings.title} saveData={updateSettings}/>
					{/* <ThemeButton /> */}
					<Button />
				</div>
			</div>
		</header>
	)
}