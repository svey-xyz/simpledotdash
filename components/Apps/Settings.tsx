'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { deleteApp, getApp, updateApp } from '@lib/db.actions'
import { Button } from '@components/ui';
import { App } from '@prisma/client';

type Props = {
	handleUpdate?: () => void,
	appID?: string,
	modalStateVisibility?: React.Dispatch<React.SetStateAction<boolean>>
}


export const Settings = ({ handleUpdate, appID, modalStateVisibility }: Props) => {
	const [app, setApp] = useState<App | null>(null)

	useEffect(() => {
		const getter = async () => {
			const app = appID ? await getApp(appID as string) : null
			setApp(app)
		}
		getter()
	}, [])

	const handleAppSettingsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		const UpdatedApp = app ?? {}

		data.forEach(function (value, key) {
			UpdatedApp[key] = value;
		});

		updateApp(app).then(() => {
			if (handleUpdate) handleUpdate()
			if (modalStateVisibility) modalStateVisibility(false)

		})
	}

	const removeApp = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();

		await deleteApp(app)
		if (handleUpdate) handleUpdate()
		if (modalStateVisibility) modalStateVisibility(false)

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