
'use client'

/** Metadata defined in layout for top route page */
import AppSection from "@components/AppSection"
import { getData } from "@lib/data.fetch"
// import TaxonomySection from "@components/TaxonomySection"
import DataError from '@components/DataError'
import { app } from "@lib/data.schema"
import { useState } from "react"
import AppCard from "@components/AppCard"

export default function Home() {
	
	const config = getData();
	if (!config.isValid || !config.data)
		return <DataError config={config}/>;

	// const apps = config.data.apps
	const taxonomies = config.data.taxonomies
	const [apps, setApps] = useState(config.data.apps);

	let unCategorizedApps: Array<app> = []
	apps?.forEach((app) => {
		let unCategorized = true;
		app.taxonomies?.forEach((taxonomy) => {
			if (taxonomies?.includes(taxonomy)) unCategorized = false;
		});
		if (unCategorized) unCategorizedApps.push(app)
	});
	

	return (
			<div className="relative flex flex-col main-padding pb-24">
				{( apps &&
					<div className="relative flex flex-row items-center gap-4">
						<h2>Apps</h2>
					</div>
				)}
				{( taxonomies && apps &&
						<div className="relative flex flex-col space-y-4 my-6">
							{taxonomies.map((taxonomy, i, arr) => {
								apps.map((app, i, arr) => {
									if (app.taxonomies?.includes(taxonomy)) return app
									return undefined
								})
								return (
									// <TaxonomySection taxonomy={taxonomy} apps={taxApps} key={taxonomy} />
									<AppSection apps={apps} onChange={setApps} />

								)
							})}
						</div>
				)}
				{/* {((unCategorizedApps && unCategorizedApps.length != 0) &&
					<div className="relative flex flex-col space-y-4 my-6">
						<h3>Un-categorized Apps</h3>
						<AppSection apps={unCategorizedApps} />
					</div>
				)} */}
				
			</div>
	)
}
