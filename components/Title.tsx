'use client'

import { getSettings, updateSettings } from '@/lib/db.actions';
import { Settings } from '@prisma/client';
import React, { useEffect, useState } from 'react';

const Title = ({initialTitle}:{initialTitle?:string}) => {
	const [settingsData, setSettingsData] = useState<Settings>(null)
	const [isLoading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		getSettings()
			.then((data) => {
				setSettingsData(data)
				setLoading(false)
			})
	}, [])

	if (isLoading) return <p>Loading...</p>
	if (!settingsData) return <p>No profile data</p>
	
	// const title = settings.title
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// setTitle(event.target.value);
	};

	const handleBlur = () => {
		// setIsEditing(false);
		// updater('/api/settings', { title: title })

		// Save the changes or perform any required actions here
	};

	const handleDoubleClick = () => {
		// setIsEditing(true)
		updateSettings({})
	}

	return (
		<div className='h-icon flex flex-col justify-center items-center'>
			{ false ? 
				<input type='text' name='title' value={`title`} autoFocus={true}
					 required/> 
				: <h1 onDoubleClick={handleDoubleClick}>{`title`}</h1>
			}	{settingsData.title}
		</div>
		
		
	);
};

export default Title;