'use client'

import { Settings } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';

const EditableText = ({ initialText, saveData }: { initialText: string, saveData?: (data:{}) => Promise<any> }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const editBtnRef = useRef<HTMLButtonElement>(null);
	const [editMode, setEditMode] = useState<boolean>(false)
	const [mounted, setMounted] = useState<boolean>(true)
	const [textData, setTextData] = useState<string>(initialText)

	useEffect(() => {
		if (!mounted) setMounted(true)
		if (editMode) inputRef?.current?.focus()
	}, [editMode])

	if (!mounted) return <p>Loading...</p>

	const closeEditMode = () => {
		setEditMode(false)
		editBtnRef?.current?.focus();
	}

	const openEditMode = () => {
		setEditMode(true)
	}

	const onEditHandler = async () => {
		const currentValue = inputRef?.current?.value;

		const settingsData = await saveData({ title: currentValue }) as Settings;
		setTextData(settingsData.title)
		closeEditMode();

		return settingsData.title;
	}

	
	return (
		<div className="textfield--wrapper">
			<div className="textfield--header">
				{/* <label>{settingsData.title}</label> */}
				<div className="textfield--header-actions">
					{editMode && (
						<button
							onClick={closeEditMode}
							aria-label="Cancel"
							title="Cancel"
							className="textfield--header-action"
						>
							{/* <CloseIcon aria-hidden="true" /> */}
						</button>
					)}
					<button
						ref={editBtnRef}
						onClick={editMode ? onEditHandler : openEditMode}
						aria-label={editMode ? 'Save' : 'Edit'}
						title={editMode ? 'Save' : 'Edit'}
						className="textfield--header-action"
					>
						{/* {editMode ? <SaveIcon aria-hidden="true" /> : <EditIcon aria-hidden="true" />} */}
						{editMode ? 'Save changes' : 'Edit'}
					</button>
				</div>
			</div>
			<input readOnly={!editMode} ref={inputRef} className="rounded-sm read-only:bg-transparent read-only:border-transparent" defaultValue={textData} />
		</div>
	);
};

export default EditableText;