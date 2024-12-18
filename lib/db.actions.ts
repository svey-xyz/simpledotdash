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

export const getApp = async (appID: string) => {
	return await prisma.app.findUnique({
		where: { id: appID },
	});
}

export const getUserById = async (userId: string) => {
	return await prisma.user.findUnique({
		where: { id: userId },
	});
}

export const updateApp = async (app?: App) => {
	const ID = app.id ?? ''

	try {
		const updatedApp = await prisma.app.upsert({
			where: { id: ID },
			update: app,
			create: app,
		})

		revalidatePath('/');
		return true
	} catch (error) {
		console.log('Error: ', error)
		return false
	}
}

export const deleteApp = async (app: App) => {
	try {
		const deletedApp = await prisma.app.delete({
			where: { id: app.id }
		})

		revalidatePath('/');
		return true
	} catch (error) {
		console.error(new Error(`Bad data: ${error}`))
		return false
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