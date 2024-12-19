'use client'

import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { ReactElement, useState } from "react"
import { Button } from "./Button"
import { XMarkIcon } from "@heroicons/react/24/solid"

type Props = {
	icon?: React.JSX.ElementType;
	className?: string;
	children: ReactElement
	callback?: () => Promise<void>,
	title?: string,
	description?: string
	defaultOpenState?: boolean
	manualClose?: boolean
	childrenHaveCallback?: boolean
};

export const Modal = ({ icon, children, className, callback, title, description, defaultOpenState = false, manualClose = true, childrenHaveCallback=false }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpenState)

	const closeModal = async () => {
		setIsOpen(false)
		if (callback) callback()
	}

	return (
		<div className="relative flex">
			{ icon &&
				<Button Icon={icon} handler={async () => setIsOpen(true)} className={`${className}`} />
			}
			<Dialog
				open={isOpen} onClose={() => { manualClose ?? setIsOpen(false) }}
				className="relative z-50"
			>
			<div className="fixed inset-0 flex flex-col w-screen min-h-screen items-center justify-center p-16 bg-bg/50 backdrop-blur-md">
					<DialogPanel className='relative flex flex-col w-fit p-8 bg-bg rounded-md shadow-md m-auto'>
						{title &&
							<DialogTitle className="font-bold">{title}</DialogTitle>
						}
						{description &&
							<Description>{description}</Description>
						}

						{ manualClose &&
							<Button Icon={XMarkIcon} handler={closeModal} />
						}
						{ childrenHaveCallback ?
							React.cloneElement(children, { callback: closeModal }) :
							children
						}
					</DialogPanel >
				</div>
			</Dialog >
		</div>
	);
};