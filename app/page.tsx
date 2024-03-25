
'use client'

import { getData } from "@lib/data.fetch"
import DataError from '@components/DataError'
import { useState } from "react"
import { AppCard } from "@components/AppCard"
import { Section } from "@components/Tiles"
import { Edit } from "@components/Buttons"

export default function Home() {
	
	const config = getData();
	if (!config.isValid || !config.data)
		return <DataError config={config}/>;

	const [apps, setApps] = useState(config.data.apps);

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
		</div>
	)
}
