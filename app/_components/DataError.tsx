import { configData } from "@lib/data.fetch"
import React from 'react'

export default function DataError({ config }: { config: configData }) {
	const title = config.validator.errors ? config.validator.errors.length > 1 ? 'Config Errors' : 'Config Error' : 'Error with Config'
	return (
		<div className="relative flex flex-col main-padding pb-24">
			<h2 className="text-failure-accent">
				{title}
			</h2>
			<div className="relative flex flex-row gap-4 flex-wrap">
				{ 
				config.validator.errors?.map((error) => {
					const path = error.instancePath
					const message = error.message
					return (
						<div key={error.instancePath} className="group relative flex flex-col border border-transparent-accent rounded-lg py-4 px-6 mt-4 overflow-hidden
							before:absolute before:inset-0 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-[rgba(17, 25, 40, 0.75)] before:-z-1">
							<h3 className="text-failure-accent font-black">{path}</h3>
							<p>{message}</p>
						</div>
					)
				})
				}
			</div>
		</div>
	)
}
{/* <a href={app.url} target="_blank" aria-label="Link to external app."
	className="group relative flex flex-row border border-transparent-accent rounded-lg py-4 px-6 mt-4 overflow-hidden
				before:absolute before:inset-0 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-[rgba(17, 25, 40, 0.75)]">
	{(Icon &&
		<div className="text-primary-text opacity-70 w-8 mr-4 group-hover:scale-[1.12] duration-100 transition-transform group-hover:opacity-100">
			<Icon />
		</div>
	)}
	<h4 className='relative'>{app.title}</h4>
</a> */}