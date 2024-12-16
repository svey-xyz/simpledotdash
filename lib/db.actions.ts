'use server'

import { revalidatePath } from 'next/cache';
import { prisma } from './db'
import { App, Settings, Session } from '@prisma/client';
import { User } from 'next-auth';

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

export const getUser = async (sessionUser: User) => {
	return await prisma.user.findUnique({
		where: { id: sessionUser.id },
		include: { apps: true, sessions: true, accounts: true },
	});
}


export const updateApp = async (data: FormData, userId:string) => {
	var app = {};
	data.forEach(function (value, key) {
		app[key] = value;
	});

	try {
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				apps: {
					create: app as App
				}
			}
		})
		revalidatePath('/');
		return true
	} catch (error) {
		return new Error(`Bad data: ${error}`)
	}
}

export const deleteApp = async (app: App, userId: string) => {
	try {
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				apps: {
					delete: app
				}
			}
		})

		return true
	} catch (error) {
		return new Error(`Bad data: ${error}`)
	}
	
}

const sanitizeAppData = async (data:{}) => {

}

const getSessionAndUser = async (sessionToken) => {
	const userAndSession = await prisma.session.findUnique({
		where: { sessionToken },
		include: { user: true },
	})
	if (!userAndSession) return null
	const { user, ...session } = userAndSession
	return { user, session }
}