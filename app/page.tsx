'use client'

import { useState } from "react"
import { AppCard } from "@components/AppCard"
import { Section } from "@components/Tiles"
import { Edit } from "@components/Buttons"
import { useSession } from "next-auth/react"
import { AppSettings } from "@components/Modals"

export default function Home() {

	const session = useSession()

	const user = session.data?.user
	const [apps, setApps] = useState(user?.apps);

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
			<AppSettings />
		</div>
	)
}
