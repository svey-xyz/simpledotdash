"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent } from 'react';

const SettingsOverlay = async ({}:{}) => {
	const router = useRouter();
	const update = async (settings: any) => {
		console.log(settings)

		await fetch(`/api/settings`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: settings.title,
			}),
		});
		router.refresh();
	};

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const updatedTitle = formData.get('title')?.toString()
		update({ title: updatedTitle })
		// const setTitle = formData.get('title')?.toString()
		// const settings = await prisma.settings.update({
		// 	where: { id: 1},
		// 	data: { title: setTitle }
		// })
	}
	
	return (
		<div className=''>
			<form onSubmit={onSubmit}>
				<input type="text" name="title" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default SettingsOverlay;