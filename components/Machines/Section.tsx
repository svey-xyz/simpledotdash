'use client'

import { useEffect, useState } from "react"
import { DnD } from "@components/ui"
import { useSession } from "next-auth/react"
import { deleteApp, getUser } from "@lib/db.actions"

import { App } from "@prisma/client"
import { Modal } from "@components/ui/Modal"
import { AdjustmentsHorizontalIcon, PlusIcon } from "@heroicons/react/24/solid"

import { Card } from "./Card"
import { Settings } from "./Settings"


export const Section = () => {
	const [appList, setAppList] = useState<Array<App>>(null)

	const session = useSession()
	const status = session

	const update = async () => {
		if (!session.data) return

		const user = await getUser(session.data?.user)
		setAppList(user.apps)
	}

	useEffect(() => {
		update()
	}, [status])

	return (
		<div className="relative flex flex-col">
			<div className="relative flex flex-row items-center gap-4">
				<h2>Apps</h2>
			</div>
			{(appList &&
				<DnD.Section tiles={appList} style={DnD.Styles.grid} onChange={setAppList}
					renderItem={(app) => (
						<DnD.Tile id={app.id} SettingsModal={SettingsModal({ id: (app.id as string), callback: update })}>
							<Card app={app} />
						</DnD.Tile>
					)}
				/>
			)}
			<Modal icon={PlusIcon} callback={update} childrenHaveCallback={true}>
				<Settings handleUpdate={update}/>
			</Modal>
		</div>
	)
}


const SettingsModal = ({ id, callback }: { id: string, callback:any }) => {
	return (
		<Modal icon={AdjustmentsHorizontalIcon} className="p-1" callback={callback} childrenHaveCallback={true}>
			<Settings appID={id} />
		</Modal>
	)
}

