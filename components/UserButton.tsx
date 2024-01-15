'use client';
import React, { useEffect, useRef, useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import MenuModal from '@/components/MenuModal';

const UserButton = ({}:{}) => {
	const [mounted, setMounted] = useState(false)
	const [menuVisibility, setMenuVisibility] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])


	return (
		<div className='relative leading-none max-h-fit'>
			<button id='themeSwitcher' aria-label="User menu toggle"
				onClick={(e) => { if (mounted) setMenuVisibility(!menuVisibility) }}>
				<UserCircleIcon className="text-fg relative group-hover:scale-[1.1] h-icon w-icon" />
			</button>
			<MenuModal visibility={menuVisibility} className='absolute' />

		</div>

		
	);
};

export default UserButton;