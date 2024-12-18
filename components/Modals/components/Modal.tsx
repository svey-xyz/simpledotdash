'use client'

import React, { PropsWithChildren, useEffect, useState } from "react"
import { ReactNode } from "react"
import { Button } from "../../Buttons/index"
import { XMarkIcon } from "@heroicons/react/24/solid"
import ReactDOM from "react-dom";
import FocusLock from 'react-focus-lock';

type Props = {
	icon?: React.JSX.ElementType;
	className?: string;
};

export const Modal = ({ icon, children, className }: PropsWithChildren<Props>) => {
	const [mounted, setMounted] = useState(false)
	const [visibility, setVisibility] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleModalVisibility = async () => {
		if (mounted) setVisibility(!visibility)
	}

	if (!mounted) return <></>
	return (
		<div className="relative flex">
			<Button Icon={icon} handler={handleModalVisibility} className={`${className}`} />
			{ ReactDOM.createPortal(
				<dialog className="absolute w-screen min-h-screen top-0 left-0 flex flex-col items-center justify-center p-16 z-50 bg-bg/50 backdrop-blur-md"
				style={{ visibility: visibility ? 'visible' : 'hidden' }}>
					<FocusLock returnFocus={true} autoFocus={true}
						className='relative flex flex-col w-fit p-8 bg-bg rounded-md shadow-md m-auto'>
						<Button Icon={XMarkIcon} handler={handleModalVisibility} />

						{children}
					</FocusLock>
			</dialog>
			, document.body)}
		</div>
		
	);
};