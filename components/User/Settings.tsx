'use client';

import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { useSession, signOut } from 'next-auth/react';
import { Modal, Button } from '@components/ui';

export const Settings = ({}:{}) => {
	const session = useSession()
	const user = session.data?.user

	return (
		<Modal icon={Cog6ToothIcon}>
			<div className='w-full min-w-full p-16'>
				<p>Logged-in as: {user?.name}</p>
				<Button
					title='Sign Out'
					handler={async () => await signOut()}
				/>
		</div>
		</Modal>
	);
};