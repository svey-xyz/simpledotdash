"use client";

import { signIn, useSession, signOut } from 'next-auth/react';
import React, { ReactNode } from 'react';

const Signin = ({}:{}) => {
	const session = useSession()
	const user = session.data?.user

	return (
		<>
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
			{(session.status == "authenticated") &&
				<div>
					<p>Logged-in as: {user?.name}</p>
					<AuthButton method={async () => await signOut() }>
						Sign Out
					</AuthButton>
				</div>
			}
		</>
		
	);
};

const AuthButton = ({ method, children }: { method: React.MouseEventHandler<HTMLButtonElement>, children?: ReactNode}) => {
	return (
		<button onClick={method}
			className='w-auto max-w-fit'>
			{children}
		</button>
	)
}

export default Signin;