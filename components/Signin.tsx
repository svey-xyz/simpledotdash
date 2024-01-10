"use client";

import { signIn } from 'next-auth/react';
import React from 'react';

const Signin = ({}:{}) => {
	return (
		<button onClick={async() => await signIn("github")}>
			Log in
		</button>
	);
};

export default Signin;