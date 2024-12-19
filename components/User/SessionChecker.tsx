'use client'

import { Edit } from "@components/Buttons"
import { Section as AppSection } from "@components/Apps/Section"
import { signIn, useSession } from "next-auth/react"
import { Button, Modal } from "@components/ui"
import { Profile } from "next-auth"
import { OAuthConfig } from "next-auth/providers/oauth"

type Props = {
	providers?: Array<{
		name: string,
		id: string
	}>
}


export const SessionChecker = ({ providers }: Props) => {
	const session = useSession()

	if (session.status !== 'authenticated') return (
		<Modal
			className="relative"
			defaultOpenState={true}
			manualClose={false}
		>
			<div className="flex flex-col">
				{providers?.flatMap((provider) => {

					return (
						<Button
							key={provider.id}
							title={provider.name}
							handler={async () => { await signIn(provider.id) }}
						/>
					)
				})}
			</div>
					
		</Modal>
	)

	return (
		<div className="relative flex flex-col">
			<AppSection />
			<Edit />
		</div>
	)
}