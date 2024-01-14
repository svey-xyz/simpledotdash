'use client';

import { updater } from '@/lib/data.fetch.client';
import { gql, useQuery } from '@apollo/client';
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useRef, useState } from 'react';

const Title = ({initialTitle}:{initialTitle?:string}) => {
	const { loading, error, data } = useQuery(gql`query Settings{
		settings {
			id
			title
		}
	}`)
	console.log(loading)
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	// const [title, setTitle] = useState<string>(initialTitle as string)
	// const [isEditing, setIsEditing] = useState(false)

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
	}

	return (
		<div className='h-icon flex flex-col justify-center items-center'>
			{ false ? 
				<input type='text' name='title' value={`title`} onChange={handleChange} autoFocus={true}
					onBlur={handleBlur} required/> 
				: <h1 onDoubleClick={handleDoubleClick}>{`title`}</h1>
			} {data.settings.title}
		</div>
		
		
	);
};

export default Title;