import React, { ElementType } from "react";
import { app } from "@lib/data.schema"


export default async function AppCard({ app }: { app: app }) {
	const Icon = app.icon ? await DynamicIcon({id:app.icon}) as ElementType : undefined
	return (
		<a href={app.url} target="_blank" aria-label="Link to external app."
			className="group relative flex flex-row border border-primary-text rounded py-4 px-6 mt-4">
			{(Icon && 
				<div className="group-hover:scale-[1.2] duration-300 transition-transform w-8 mr-4">
					<Icon />
				</div>
			)}
			<h4 className='relative'>{app.title}</h4>
		</a>
	)
}

async function DynamicIcon({id}: {id: string}) {
	const DynamicComponent = await import('@heroicons/react/24/solid')
	let iconID = id as keyof typeof DynamicComponent
	return DynamicComponent[iconID]
}