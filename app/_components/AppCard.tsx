import React from "react";
import { app } from "@lib/data.schema"

export default function AppCard({ app }: { app: app }) {
	return (
		<div className="relative h-full flex flex-col items-center justify-center py-4">
				<h3 className='w-full relative pb-4'>{app.title}</h3>
		</div>
	)
}