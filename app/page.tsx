
'use client'

import { getData } from "@lib/data.fetch"
import DataError from '@components/DataError'
import { useState } from "react"
import { AppCard } from "@components/AppCard"
import { Section } from "@components/Tiles"

export default function Home() {
	
	const config = getData();
	if (!config.isValid || !config.data)
		return <DataError config={config}/>;

	const apps = config.data.apps;

	const [tiles, setTiles] = useState(apps);

	return (
		<div className="relative flex flex-col main-padding pb-24">
			{( tiles &&
				<div className="relative flex flex-row items-center gap-4">
					<h2>Apps</h2>
				</div>
			)}
			{(tiles &&
				<Section tiles={tiles} onChange={setTiles} renderItem={(tile) => (
					<Section.Tile id={tile.id}>
						<AppCard app={tile}/>
					</Section.Tile>
				)} />
			)}
		</div>
	)
}
