/** Metadata defined in layout for top route page */
// import { config } from "@lib/data.types"

import AppCard from "@components/AppCard";
import AppSection from "@components/AppSection"
import { getData } from "@/lib/data.fetch"
import TaxonomySection from "@components/TaxonomySection"

export default async function Home() {
	const config = getData()
	if (!config) return;
	const apps = config.apps
	const unCategorizedApps = apps?.map((app, i, arr) => {
		if (app.taxonomies?.length == 0) return app
	})
	const taxonomies = config.taxonomies

	return (
		<div className="relative flex flex-col main-padding">
			{( apps && 
				<h2>Apps</h2>
			)}
			{( taxonomies && apps &&
					<div className="relative flex flex-col space-y-4 my-6">
						{taxonomies.map((taxonomy, i, arr) => {
							const taxApps = apps.map((app, i, arr) => {
								if (app.taxonomies?.includes(taxonomy.title)) return app
								return undefined
							})
							return (<TaxonomySection taxonomy={taxonomy} apps={taxApps} key={taxonomy.title} />)
						})}
					</div>
			)}
			{(unCategorizedApps && (unCategorizedApps.length == 0) &&
				<div>
					<h2>Un-categorized Apps</h2>
					<AppSection apps={unCategorizedApps} />
				</div>
			)}
	
		</div>
	)
}