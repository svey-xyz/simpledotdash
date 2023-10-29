import React, { ElementType } from "react";
import { app, taxonomy } from "@lib/data.schema"
import AppSection from "@components/AppSection";


export default async function TaxonomySection({ taxonomy, apps }: { taxonomy: taxonomy, apps: Array<app | undefined> }) {
	return (
		<div className="">
			<h3>{taxonomy.title}</h3>
			<AppSection apps={apps} />
		</div>
	)
}

