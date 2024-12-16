'use client'

import { useEffect, useState } from "react"
import { AppCard } from "@components/AppCard"
import { Section } from "@components/Tiles"
import { Edit } from "@components/Buttons"
import { useSession } from "next-auth/react"
import { AppSettings } from "@components/Modals"
import { deleteApp, getUser } from "@lib/db.actions"

import { App } from "@prisma/client"
import { UniqueIdentifier } from "@dnd-kit/core"

export default function Home() {
	const [apps, setApps] = useState<Array<App>>(null)

	const session = useSession()

	const updateApps = () => {
		if (!session.data) return
		getUser(session.data?.user).then((user) => {
			setApps(user.apps)
		})
	}

	useEffect(() => {
		updateApps()
	}, [setApps, session])

	const removeApp = async (id: UniqueIdentifier) => {
		if (!session.data) return

		const user = session.data.user
		const app = apps.find((app) => app.id === id)

		await deleteApp(app, user?.id)
		updateApps()
	}

	if (session.status !== 'authenticated') return <></>

	return (
		<div className="relative flex flex-col main-padding pb-24">
			<div className="relative flex flex-row items-center gap-4">
				<h2>Apps</h2>
			</div>
			{(apps &&
				<Section tiles={apps} style={Section.Styles.grid} onChange={setApps} renderItem={(tile) => (
				<Section.Tile id={tile.id} removeItem={removeApp}>
						<AppCard app={tile}/>
					</Section.Tile>
				)} />
			)}
			<Edit />
			<AppSettings handleUpdate={updateApps}/>
		</div>
	)
}
