'use client'

import React from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { updateApp } from '@lib/db.actions'
import { Button } from '@components/Buttons';
import { useSession } from 'next-auth/react';
import { App } from '@prisma/client';


export const AppCardSettings = ({ handleUpdate, app }: { handleUpdate?: () => void, app?: App }) => {
	const session = useSession()

	const handleAppSettingsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const user = session.data?.user

		updateApp(data, user.id).then(() => {
			handleUpdate()
		})

	}

	return (
		<form method='dialog' className='flex flex-col gap-4 w-fit' onSubmit={handleAppSettingsUpdate}>
			<label className='flex flex-row justify-between gap-3'>
				Title:
				<input type="text" name="title" defaultValue={app?.title} required />
			</label>
			<label className='flex flex-row justify-between gap-3'>
				URL:
				<input type="text" name="url" defaultValue={app?.url} required />
			</label>
			<label className='flex flex-row justify-between gap-3'>
				Display URL:
				<input type="text" name="displayURL" defaultValue={app?.displayURL} />
			</label>
			<label className='flex flex-row justify-between gap-3'>
				Description:
				<textarea name="description" defaultValue={app?.description} />
			</label>
			<Button Icon={ArrowRightOnRectangleIcon} method='submit' />
		</form>
	);
};