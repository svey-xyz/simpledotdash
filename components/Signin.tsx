"use client";

import { signIn, useSession, signOut } from 'next-auth/react';
import React from 'react';

const Signin = ({}:{}) => {
	const session = useSession()
	const status = session.status
	const user = session.data?.user

	const StateBasedButton = session.status == "authenticated" ?
		(<button onClick={async () => await signOut()}>
			Sign out
		</button>) :
		(<button onClick={async () => await signIn("github")}>
			Sign in
		</button>)
	return (
		<>
			{StateBasedButton}
			{(session.status == "authenticated") &&
				<p>Logged-in as: {user?.name}</p>
			}
		</>
		
	);
};

export default Signin;