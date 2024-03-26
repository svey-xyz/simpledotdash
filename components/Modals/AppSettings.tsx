import React, { useEffect, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { Modal } from './components/Modal';
import { getAppFields } from '@lib/db.actions'


export const AppSettings = ({ app }: { app?: any }) => {

	return (
		<Modal icon={PencilSquareIcon}>
			<form method='dialog' className='flex flex-col gap-4 w-fit'>
				<label className='flex flex-row justify-between gap-3'>
					Title:
					<input type="text" name="title" defaultValue={app?.title} />
				</label>
				<label className='flex flex-row justify-between gap-3'>
					Title:
					<input type="text" name="title" defaultValue={app?.title} />
				</label>
				<label className='flex flex-row justify-between gap-3'>
					URL:
					<input type="text" name="URL" defaultValue={app?.url} />
				</label>
				<label className='flex flex-row justify-between gap-3'>
					Display URL:
					<input type="text" name="displayURL" defaultValue={app?.displayURL} />
				</label>
				<label className='flex flex-row justify-between gap-3'>
					Description:
					<textarea name="description" defaultValue={app?.description} />
				</label>
			</form>
		</Modal>
	);
};