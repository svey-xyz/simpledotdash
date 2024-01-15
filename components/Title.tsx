'use client'

import prisma from '@/lib/db';
import { getSettings, updateSettings } from '@/lib/db.actions';
import { Settings } from '@prisma/client';
import React, { useEffect, useRef, useState } from 'react';



const Title = ({initialTitle}:{initialTitle?:string}) => {
	const [settingsData, setSettingsData] = useState<Settings>(null)
	const [mounted, setMounted] = useState<boolean>(true)

	const [editMode, setEditMode] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null);
	const editBtnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		getSettings()
			.then((data) => {
				setSettingsData(data)
				setMounted(false)
			})
	}, [])


	if (mounted) return <p>Loading...</p>
	if (!settingsData) return <p>No profile data</p>

	const closeEditMode = () => {
		setEditMode(false)
		editBtnRef?.current?.focus();
	}

	const openEditMode = () => {
		setEditMode(true)
	}

	const onEditHandler = async () => {
		const currentValue = inputRef?.current?.value;

		const onSavePromise = await updateSettings({title:currentValue});
		setSettingsData(onSavePromise)
		closeEditMode();

		return onSavePromise;
	}

	return (
		<div className="textfield--wrapper">
			<div className="textfield--header">
				<label>{settingsData.title}</label>
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
			<input readOnly={!editMode} ref={inputRef} className="textfield--input" />
		</div>
		
		
	);
};

export default Title;