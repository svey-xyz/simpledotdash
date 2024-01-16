import React from "react";
import { app } from "../lib/data.schema";
import AppCard from "@components/AppCard";

export default function AppSection({apps}:{apps:Array<app | undefined>}) {
	return (<div 
		className="relative flex flex-row gap-4 flex-wrap">
			{apps.map((app, i, arr) => {
				return (app && <AppCard app={app} key={app.title} />)
			})}
	</div>)
}