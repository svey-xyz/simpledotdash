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
	const taxonomies = config.taxonomies

	return (
		<div className="relative flex flex-col main-padding">
			{( taxonomies && apps &&
				<div className="">
					<h2>Categories</h2>
					<div className="relative flex flex-col space-y-4 my-6">
						{taxonomies.map((taxonomy, i, arr) => {
							const taxApps = apps.map((app, i, arr) => {
								if (app.taxonomies?.includes(taxonomy.title)) return app
								return undefined
							})
							return (<TaxonomySection taxonomy={taxonomy} apps={taxApps} key={taxonomy.title} />)
						})}
					</div>
				</div>
			)}
			{(apps &&
				<div className="">
					<h2>Apps</h2>
					<AppSection apps={apps} />
				</div>
			)}
	
		</div>
	)
}