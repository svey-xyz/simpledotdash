import React from "react";
import { app } from "@lib/data.schema"

export default function AppCard({ app }: { app: app }) {
	return (
		<div className="relative h-full flex flex-col items-center justify-center pt-12">
			<div className="main-padding flex flex-row items-center justify-between z-50">
				<h3 className='w-full relative pb-4 separator'>{app.title}</h3>
			</div>
		</div>
	)
}