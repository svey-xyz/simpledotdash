import React, { ElementType } from "react";
import { app } from "@lib/data.schema"


export default async function AppCard({ app }: { app: app }) {
	const Icon = app.icon ? await DynamicIcon({id:app.icon}) as ElementType : undefined
	return (
		<a href={app.url} target="_blank" aria-label="Link to external app."
			className="relative flex flex-row border-2 border-primary-text rounded py-4 px-6">
			{(Icon && 
				<div className="w-8 mr-4">
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