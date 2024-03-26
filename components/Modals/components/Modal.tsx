'use client'

import React, { useEffect, useState } from "react"
import { ReactNode } from "react"
import { Button } from "../../Buttons/index"
import { XMarkIcon } from "@heroicons/react/24/solid"
import ReactDOM from "react-dom";
import FocusLock from 'react-focus-lock';

export const Modal = ({ icon, children }: { icon: React.JSX.ElementType, children?: ReactNode }) => {
	const [mounted, setMounted] = useState(false)
	const [visibility, setVisibility] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleModalVisibility = async () => {
		if (mounted) setVisibility(!visibility)
	}

	return (
		<div>
			<Button Icon={icon} handler={handleModalVisibility} />
			{ReactDOM.createPortal(
			<dialog className="absolute w-screen h-screen top-0 left-0 flex flex-col"
				style={{ visibility: visibility ? 'visible' : 'hidden' }}>
					<FocusLock returnFocus={true} autoFocus={true}
						className='relative flex flex-col mx-auto my-auto p-8 bg-bg rounded-md shadow-md'>
						<Button Icon={XMarkIcon} handler={handleModalVisibility} />

						{children}
					</FocusLock>
			</dialog>
			, document.body)}
		</div>
		
	);
};