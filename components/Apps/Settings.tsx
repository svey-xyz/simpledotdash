'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { deleteApp, getApp, updateApp } from '@lib/db.actions'
import { Button } from '@components/ui';
import { App } from '@prisma/client';
import { useSession } from 'next-auth/react';

type Props = {
	handleUpdate?: () => void,
	appID?: string,
	callback?: () => Promise<void>
}


export const Settings = ({ handleUpdate, appID, callback }: Props) => {
	const [app, setApp] = useState<App | null>(null)
	const session = useSession()

	useEffect(() => {
		const getter = async () => {
			const app = appID ? await getApp(appID as string) : null
			setApp(app)
		}
		getter()
	}, [])

	const handleAppSettingsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!session.data) return
		const user = session.data.user

		const data = new FormData(e.currentTarget);

		const UpdatedApp = app ?? {}

		data.forEach(function (value, key) {
			UpdatedApp[key] = value;
		});

		updateApp(UpdatedApp as App, user.id).then(() => {
			// if (handleUpdate) handleUpdate()
			if (callback) callback()
		})
	}

	const removeApp = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();

		await deleteApp(app)
		// if (handleUpdate) handleUpdate()
		if (callback) callback()

	}

	return (
		<div className='relative flex flex-col'>
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
				
				<div className='flex flex-row justify-between'>
					<Button Icon={ArrowRightOnRectangleIcon} method='submit' />

					{app &&
						<div
							className={`text-accent-failure cursor-pointer`}
							onClick={removeApp}
						>
							Delete
						</div>

					}
				</div>
			</form>
			
		</div>
		
	);
};