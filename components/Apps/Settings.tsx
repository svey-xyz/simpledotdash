'use client'

import React, { useEffect, useState } from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { deleteApp, getApp, updateApp } from '@lib/db.actions'
import { Button } from '@components/ui';
import { App } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Field, Fieldset, Input, Label, Legend, Textarea } from '@headlessui/react'

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

	const update = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!session.data) return
		const user = session.data.user

		const data = new FormData(e.currentTarget);

		const UpdatedApp = app ?? {}

		data.forEach(function (value, key) {
			UpdatedApp[key] = value;
		});

		updateApp(UpdatedApp as App, user.id).then(() => {
			if (callback) callback()
		})
	}

	const removeApp = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		await deleteApp(app)
		if (callback) callback()
	}

	return (
		<div className='relative flex flex-col'>
			<form onSubmit={update}>
				<Fieldset className='flex flex-col gap-4 w-fit'>
					<Legend className="text-lg font-bold">App Settings</Legend>
					<Field className={`flex flex-row justify-between gap-3`}>
						<Label className="block">Title:</Label>
						<Input className="mt-1 block" name="title" defaultValue={app?.title} required />
					</Field>
					<Field className={`flex flex-row justify-between gap-3`}>
						<Label className="block">URL:</Label>
						<Input className="mt-1 block" name="url" defaultValue={app?.url} required />
					</Field>
					<Field className={`flex flex-row justify-between gap-3`}>
						<Label className="block">Display URL:</Label>
						<Input className="mt-1 block" name="displayURL" defaultValue={app?.displayURL} required />
					</Field>
					<Field className={`flex flex-row justify-between gap-3`}>
						<Label className="block">Description:</Label>
						<Textarea className="mt-1 block" name="description" defaultValue={app?.description} required />
					</Field>
					
					<div className='flex flex-row justify-between'>
						<Button Icon={ArrowRightOnRectangleIcon} method='submit' />

						{app &&
							<Button
								title={`Delete`}
								className={`text-accent-failure cursor-pointer`}
								handler={removeApp}
							/>

						}
					</div>
				</Fieldset >
			</form>
			
		</div>
		
	);
};