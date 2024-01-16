"use client";

import { fetcher, updater } from "@lib/data.fetch.client";
import React, { FormEvent } from 'react';
import useSWR from 'swr'

const SettingsOverlay = ({}:{}) => {
	const settingsSWR = useSWR('/api/settings', fetcher)

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const updatedTitle = formData.get('title')?.toString()
		updater('/api/settings', { title: updatedTitle })
	}

	if (settingsSWR.error) return <div>failed to load</div>
	if (settingsSWR.isLoading) return <div>loading...</div>
	
	return (
		<div className=''>
			<form onSubmit={onSubmit}>
				<input type="text" name="title" defaultValue={settingsSWR.data?.title} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default SettingsOverlay;