'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Cog6ToothIcon, WrenchIcon } from '@heroicons/react/24/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import ThemeButton from '@components/ThemeButton';

export const Button = ({}:{}) => {
	const [mounted, setMounted] = useState(false)
	const [menuVisibility, setMenuVisibility] = useState<boolean>(false)
	
	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<div className='relative leading-none max-h-fit'>
			<button id='themeSwitcher' aria-label="User menu toggle"
				onClick={(e) => { if (mounted) setMenuVisibility(!menuVisibility) }}>
				<Cog6ToothIcon className="text-fg relative group-hover:scale-[1.1] h-icon w-icon" />
			</button>
			<Modal visibility={menuVisibility} />
		</div>
	);
};

const Modal = ({visibility}:{visibility:boolean}) => {
	const session = useSession()
	const user = session.data?.user
	
	return (
		<section className="absolute right-0 w-96 z-50"
			style={{ visibility: visibility ? 'visible' : 'hidden' }}>
			<div className='relative w-full min-w-full flex flex-col justify-end items-end'>
				<div className='w-full min-w-full bg-fg/20 py-8 px-4'>
					<ThemeButton />
					{(session.status == "unauthenticated") &&
						<div className='flex flex-col gap-4'>
							<AuthButton method={async () => await signIn("github")}>
								GitHub
							</AuthButton>
							<AuthButton method={async () => await signIn("discord")}>
								Discord
							</AuthButton>
						</div>
					}
					<EditButton/>
					{(session.status == "authenticated") &&
						<div>
							<p>Logged-in as: {user?.name}</p>
							<AuthButton method={async () => await signOut()}>
								Sign Out
							</AuthButton>
						</div>
					}
				</div>
			</div>
		</section>
	)
}

const AuthButton = ({ method, children }: { method: React.MouseEventHandler<HTMLButtonElement>, children?: ReactNode }) => {
	return (
		<button onClick={method}
			className='w-auto max-w-fit'>
			{children}
		</button>
	)
}

export const EditButton = ({}:{}) => {
	const { data: session, status, update } = useSession()
	const editing = session?.user?.editing
	const handleEnterEdit = async() => {
		update({ editing: !editing })
	}

	return (
		<button aria-label="Enter edit mode" onClick={handleEnterEdit}>
			<WrenchIcon className="text-fg relative group-hover:scale-[1.1] h-icon w-icon"/>
		</button>
	);
};