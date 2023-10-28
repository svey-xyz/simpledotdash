/** Metadata defined in layout for top route page */
// import { config } from "@lib/data.types"

import AppCard from "@/app/_components/AppCard";
import { getData } from "@/lib/data.fetch"

export default async function Home() {
	const config = getData()
	if (!config) return;
	const apps = config.apps
	return (
		<div className="relative flex flex-col main-padding">

			{(apps &&
				<div className="">
					<h2>Apps</h2>
					{apps?.map((app, i, arr) => {
						return (<AppCard app={app} key={app.title} />)
					})}
				</div>
			)}
	
		</div>
	)
}