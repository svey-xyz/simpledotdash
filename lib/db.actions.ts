'use server'

import { revalidatePath } from 'next/cache';
import { prisma } from './db'
import { Settings } from '@prisma/client';

export const updateSettings = async (data:{}) => {
	let settings: Settings
	try {
		settings=await prisma.settings.update({ where: { id: 0 }, data });

	} catch (error) {
	}
	revalidatePath('/');
	return settings
	
}

export const getSettings = async () => {
	return await prisma.settings.findFirst({ where: { id: 0 }});
}

export const getAppFields = async () => {
	return Object.keys(prisma.app.fields)
}