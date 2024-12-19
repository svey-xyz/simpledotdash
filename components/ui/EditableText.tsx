'use client'

import { Settings } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import { Input } from '@headlessui/react'

export const EditableText = ({ initialText, saveData }: { initialText: string, saveData?: (data:{}) => Promise<any> }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const session = useSession()
	const user = session.data?.user
	const editMode = user?.editing

	useEffect(() => {
		if (!editMode) save()
	}, [editMode])

	const save = async () => {
		const currentValue = inputRef?.current?.value;
		return await saveData({ title: currentValue }) as Settings;
	}

	
	return (
		<div className="">
			<Input readOnly={!editMode} ref={inputRef} defaultValue={initialText}
				className="rounded-sm bg-transparent outline-none read-only:pointer-events-none border-b-2 read-only:border-transparent border-fg" />
		</div>
	);
};