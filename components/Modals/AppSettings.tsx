import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import type { app } from '../../lib/data.schema'
import { Modal } from './components/Modal';


export const AppSettings = ({app}: {app?:app}) => {
	return (
		<Modal icon={PencilSquareIcon}>
			<form>
				<input />
			</form>
		</Modal>
	);
};