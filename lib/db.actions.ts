'use server'

import { revalidatePath } from 'next/cache';
import { prisma } from './db'

export const updateSettings = async (data:{}) => {
	console.log('wowza')
	await prisma.settings.update({where:{id:0}, data});
	revalidatePath('/');
}

export const getSettings = async () => {
	return await prisma.settings.findFirst({ where: { id: 0 }});
}