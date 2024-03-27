'use client'

import { useEffect, useState } from "react"
import { AppCard } from "@components/AppCard"
import { Section } from "@components/Tiles"
import { Edit } from "@components/Buttons"
import { useSession } from "next-auth/react"
import { AppSettings } from "@components/Modals"
import { getUser } from "@lib/db.actions"

import { App } from "@prisma/client"

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

	if (session.status == 'unauthenticated') return <></>
	if (session.status !== 'authenticated') return <></>

	return (
		<div className="relative flex flex-col main-padding pb-24">
			<div className="relative flex flex-row items-center gap-4">
				<h2>Apps</h2>
			</div>
			{(apps &&
				<Section tiles={apps} style={Section.Styles.grid} onChange={setApps} renderItem={(tile) => (
					<Section.Tile id={tile.id}>
						<AppCard app={tile}/>
					</Section.Tile>
				)} />
			)}
			<Edit />
			<AppSettings handleUpdate={updateApps}/>
		</div>
	)
}
