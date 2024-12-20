'use server'

import { prisma } from './db'
import { App, Settings, Session } from '@prisma/server/data.schema';
import { User } from 'next-auth';

export const updateSettings = async (data: Settings) => {
	let settings: Settings
	try {
		settings=await prisma.settings.update({ where: { id: data.id }, data });

	} catch (error) {
	}

	return settings
	
}

export const getSettings = async (sessionUser: User) => {
	return await prisma.settings.findUnique({ where: { id: sessionUser.id }});
}

export const getUser = async (sessionUser: User) => {
	return await prisma.user.findUnique({
		where: { id: sessionUser.id },
		include: { apps: true, machines: true, sessions: true, accounts: true },
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

export const updateApp = async (app: App, userId?: string) => {
	const ID = app.id ?? ''

	try {
		const updatedApp = await prisma.app.upsert({
			where: { id: ID },
			update: {
				title: app.title,
				url: app.url,
				displayURL: app.displayURL,
				description: app.description,
				icon: app.icon,
			},
			create: {
				id: app.id,
				title: app.title,
				url: app.url,
				displayURL: app.displayURL,
				description: app.description,
				icon: app.icon,
				user: {
					connect: {
						id: userId
					}
				}
			},
		})

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