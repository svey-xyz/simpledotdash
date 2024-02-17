import { UniqueIdentifier } from "@dnd-kit/core"
import { JTDDataType } from "ajv/dist/core"

export type config = {
	settings: settings,
	taxonomies?: Array<taxonomy>,
	apps?: Array<app>,
	bookmarks?: Array<bookmark>,
	widgets?: Array<widget>,
}

export type settings = {
	title: string,
	description?: string,
	icon?: string,
}

export type app = {
	id: UniqueIdentifier,
	title: string,
	url: string,
	description?: string,
	displayURL?: string,
	icon?: string,
	taxonomies?: Array<string>,
}

export type taxonomy = string;

export type bookmark = {
	title: string,
	url: string,
	description?: string,
	displayURL?: string,
	taxonomies?: Array<string>,
}

export type widget = {

}

export const schema: JTDDataType<config> = {
	properties: {
		settings: {
			properties: {
				title: { type: "string" },
			},
			optionalProperties: {
				description: { type: "string" },
				icon: { type: "string" },
			},
		},
	},
	optionalProperties: {
		taxonomies: {
			elements: { type: "string" },
		},
		apps: {
			elements: {
				properties: {
					id: { type: "string" },
					title: { type: "string" },
					url: { type: "string" },
				},
				optionalProperties: {
					description: { type: "string" },
					displayURL: { type: "string" },
					icon: { type: "string" },
					taxonomies: {
						elements: { type: "string" },
					},
				},
			}
		},
		bookmarks: {
			elements: {
				properties: {
					title: { type: "string" },
					url: { type: "string" },
				},
				optionalProperties: {
					description: { type: "string" },
					displayURL: { type: "string" },
				},
			},
		},
	},
}
