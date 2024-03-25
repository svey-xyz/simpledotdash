'use client'

import React, { useEffect, useState } from "react"
import { ReactNode } from "react"
import { Button } from "../../Buttons/index"

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
		<div className=''>
			<Button Icon={icon} handler={handleModalVisibility} />
			<section className="absolute m-auto"
				style={{ visibility: visibility ? 'visible' : 'hidden' }}>
				<div className='relative flex flex-col'>
					{children}
				</div>
			</section>
		</div>
	);
};