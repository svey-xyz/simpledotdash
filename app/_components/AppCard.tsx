import React from "react";
import { app } from "@lib/data.schema"

export default function AppCard({ app }: { app: app }) {
	return (
		<a href={app.url} target="_blank" aria-label="Link to external app." className="relative flex flex-col w-fit border-2 border-primary-text rounded">
			<h3 className='relative py-4 px-2'>{app.title}</h3>
		</a>
	)
}