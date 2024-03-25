'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Button } from './Button';


export const Edit = ({}: {}) => {
	const { data: session, status, update } = useSession()
	const editing = session?.user?.editing
	const handleEnterEdit = async () => {
		update({ editing: !editing })
	}

	return (
		<Button Icon={PencilSquareIcon} handler={handleEnterEdit}/>
		// <button aria-label="Enter edit mode" onClick={handleEnterEdit}>
		// 	<PencilSquareIcon className="text-fg relative group-hover:scale-[1.1] h-icon w-icon" />
		// </button>
	);
};