'use client'

import React from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { Button } from '@components/ui';
import { Field, Fieldset, Input, Label, Legend, Textarea } from '@headlessui/react'

type Props = {
	title: string
	FieldSettings: Array<SettingsField>
	item: any
	updateItem: (item: any) => Promise<void>
	deleteItem: (item: any) => Promise<void>
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


export const Settings = ({ title, FieldSettings, item, updateItem, deleteItem }: Props) => {

	const update = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const UpdatedItem = item ?? {}

		data.forEach(function (value, key) {
			UpdatedItem[key] = value;
		});

		updateItem(UpdatedItem)
	}

	const removeItem = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		await deleteItem(item)
	}

	return (
		<div className='relative flex flex-col'>
			<form onSubmit={update}>
				<Fieldset className='flex flex-col gap-4 w-fit'>
					<Legend className="text-lg font-bold">{ title }</Legend>
					{ FieldInputs(FieldSettings) }
					<div className='flex flex-row justify-between'>
						<Button Icon={ArrowRightOnRectangleIcon} method='submit' />
						{ item &&
							<Button
								title={`Delete`}
								className={`text-accent-failure cursor-pointer`}
								handler={removeItem}
							/>
						}
					</div>
				</Fieldset >
			</form>

		</div>

	);
};

const FieldInputs = (fields: Array<SettingsField>) => {
	return (
		<>
			{fields.flatMap((field) => {
				let Input
				switch (field.type) {
					case (SettingsTypes.string):
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
						{Input}
					</Field>
				)
			})}
		</>
	)
}