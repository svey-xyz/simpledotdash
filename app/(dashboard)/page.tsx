/** Metadata defined in layout for top route page */

import AppSection from "@components/AppSection"
import { getData } from "@/lib/data.fetch"
import TaxonomySection from "@components/TaxonomySection"
import DataError from '@components/DataError'

export default async function Home() {
	const config = getData()
	if (!config.isValid || !config.data) return <DataError config={config}/>;
	const apps = config.data.apps
	const unCategorizedApps = apps?.map((app, i, arr) => {
		if (app.taxonomies?.length == 0) return app
	})
	const taxonomies = config.data.taxonomies

	return (
		<div className="relative flex flex-col main-padding pb-24">
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