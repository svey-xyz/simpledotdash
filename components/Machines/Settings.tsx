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
enum SettingsTypes {
	string,
	text
}

type SettingsField = {
	name: string,
	type: SettingsTypes,
	defaultValue?: string
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

		// updateApp(UpdatedApp as App, user.id).then(() => {
		// 	if (callback) callback()
		// })
	}

	const removeApp = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		// await deleteApp(app)
		if (callback) callback()
	}

	



	const FieldSettings: Array<SettingsField> = [
		{ name: 'title', type: SettingsTypes.string },
		{ name: 'url', type: SettingsTypes.string },
		{ name: 'displayUrl', type: SettingsTypes.string },
		{ name: 'description', type: SettingsTypes.text },
	]

	return (
		<div className='relative flex flex-col'>
			<form onSubmit={update}>
				<Fieldset className='flex flex-col gap-4 w-fit'>
					<Legend className="text-lg font-bold">App Settings</Legend>
					{ SettingsInput(FieldSettings) }
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

const SettingsInput = (fields: Array<SettingsField>) => {
	return (
		<>
			{fields.flatMap((field) => {
				let Input
				switch (field.type) {
					case(SettingsTypes.string):
						Input = <Input className="mt-1 block" name={field.name} defaultValue={field.defaultValue} />
						break;
					case (SettingsTypes.text):
						Input = <Textarea className="mt-1 block" name={field.name} defaultValue={field.defaultValue} />
						break;
					default:
						Input = <></>
						break;
				}

				return (
					<Field className={`flex flex-row justify-between gap-3`}>
						<Label className="block">{field.name}:</Label>
						{ Input }
					</Field>
				)
			})}
		</>
	)
}