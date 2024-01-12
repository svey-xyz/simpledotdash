'use client';

import { updater } from '@/lib/data.fetch.client';
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useRef, useState } from 'react';

const Title = ({initialTitle}:{initialTitle?:string}) => {
	const [title, setTitle] = useState<string>(initialTitle as string)
	const [isEditing, setIsEditing] = useState(false)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleBlur = () => {
		setIsEditing(false);
		updater('/api/settings', { title: title })

		// Save the changes or perform any required actions here
	};

	const handleDoubleClick = () => {
		setIsEditing(true)
	}

	return (
		<div className='h-icon flex flex-col justify-center items-center'>
			{ isEditing ? 
				<input type='text' name='title' value={title} onChange={handleChange} autoFocus={true}
					onBlur={handleBlur} required/> 
				: <h1 onDoubleClick={handleDoubleClick}>{title}</h1>
			}
		</div>
		
		
	);
};

export default Title;