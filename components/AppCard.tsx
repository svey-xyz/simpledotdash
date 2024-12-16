import React from "react";
import { App } from "@lib/data.schema"

export const AppCard = ({ app }: {app:App}) => {
	// const Icon = app.icon ? await DynamicIcon({id:app.icon}) as ElementType : undefined
	// const { attributes, listeners, setNodeRef, transform } = useDraggable({
	// 	id: app.title,
	// });


	return (
		<a
			className={`group relative flex flex-row border border-transparent-accent rounded-lg py-4 px-6 mt-4 overflow-hidden
			before:absolute before:inset-0 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-[rgba(17, 25, 40, 0.75)]
			`}
			href={app.url}
			target="_blank"
		>
			{/* {(Icon && 
				<div className="text-fg opacity-70 w-8 mr-4 group-hover:scale-[1.12] duration-100 transition-transform group-hover:opacity-100">
					<Icon />
				</div>
			)} */}
			<div className="relative">
				<h4 className='font-bold'>{app.title}</h4>
				<span className="font-thin">{app.displayURL}</span>
			</div>
			
		</a>
	)
}