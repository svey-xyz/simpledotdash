'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { getApp, updateApp } from '@lib/db.actions'
import { Button } from '@components/Buttons';
import { useSession } from 'next-auth/react';
import { App } from '@prisma/client';


export const AppCardSettings = ({ handleUpdate, appID }: { handleUpdate?: () => void, appID?: string }) => {
	const session = useSession()
	const [app, setApp] = useState<App | null>(null)

	useEffect(() => {
		const getter = async () => {
			const app = appID ? await getApp(appID as string) : null
			setApp(app)
		}
		getter()
	})

	const handleAppSettingsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const user = session.data?.user

		const UpdatedApp = app ?? {}

		data.forEach(function (value, key) {
			UpdatedApp[key] = value;
		});

		updateApp(user.id, app).then(() => {
			if (handleUpdate) handleUpdate()
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