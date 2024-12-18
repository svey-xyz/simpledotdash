'use client'

import { useEffect, useState } from "react"
import { AppCard } from "@components/AppCard"
import { Section } from "@components/Tiles"
import { useSession } from "next-auth/react"
import { deleteApp, getUser } from "@lib/db.actions"

import { App } from "@prisma/client"
import { UniqueIdentifier } from "@dnd-kit/core"
import { AppCardSettings } from "@components/AppCardSettings"
import { Modal } from "@components/Modals/components/Modal"
import { PlusIcon } from "@heroicons/react/24/solid"

export const AppsSection = () => {
	const [appList, setAppList] = useState<Array<App>>(null)

	const session = useSession()

	const update = async () => {
		if (!session.data) return
		getUser(session.data?.user).then((user) => {
			setAppList(user.apps)
		})

	}

	useEffect(() => {
		update()
	}, [setAppList, session])

	const removeApp = async (id: UniqueIdentifier) => {
		if (!session.data) return

		const user = session.data.user
		const app = appList.find((app) => app.id === id)

		await deleteApp(app, user?.id)
		update()
	}

	return (
		<div className="relative flex flex-col">
			<div className="relative flex flex-row items-center gap-4">
				<h2>Apps</h2>
			</div>
			{(appList &&
				<Section tiles={appList} style={Section.Styles.grid} onChange={setAppList}
					renderItem={(tile) => (
						<Section.Tile id={tile.id} removeItem={removeApp} updateItem={update}>
							<AppCard app={tile} />
						</Section.Tile>
					)}
				/>
			)}
			<Modal icon={PlusIcon}>
				<AppCardSettings handleUpdate={update} />
			</Modal>
		</div>
	)
}
