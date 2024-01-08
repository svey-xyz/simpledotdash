"use client";

import React from 'react';

import { PencilSquareIcon } from '@heroicons/react/24/solid';

const EditButton = ({}:{}) => {
	return (
		<button className="relative w-icon h-icon"
			onClick={()=>{console.log("clicked");
		}}>
			<PencilSquareIcon className='relative text-primary-text w-icon h-icon' />
		</button>
	);
};

export default EditButton;