import React, { ElementType } from "react";
import { app } from "@lib/data.schema"


export default async function AppCard({ app }: { app: app }) {
	const Icon = app.icon ? await DynamicIcon({id:app.icon}) as ElementType : undefined
	return (
		<a href={app.url} target="_blank" aria-label="Link to external app."
			className="group relative flex flex-row border border-transparent-accent rounded-lg py-4 px-6 mt-4 overflow-hidden
				before:absolute before:inset-0 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-[rgba(17, 25, 40, 0.75)]">
			{(Icon && 
				<div className="text-fg opacity-70 w-8 mr-4 group-hover:scale-[1.12] duration-100 transition-transform group-hover:opacity-100">
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