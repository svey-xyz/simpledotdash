'use client'

import { useEffect, useState } from "react"
import { DnD, Modal } from "@ui"
import { useSession } from "next-auth/react"
import { deleteApp, getUser } from "@lib/db.actions"

import { Machine } from "@prisma/server/data.schema"
import { AdjustmentsHorizontalIcon, PlusIcon } from "@heroicons/react/24/solid"

import { Card } from "./Card"
import { Settings } from "./Settings"


export const Section = () => {
	const [machineList, setMachineList] = useState<Array<Machine>>(null)

	const session = useSession()
	const status = session

	const update = async () => {
		if (!session.data) return

		const user = await getUser(session.data?.user)
		setMachineList(user.machines)
	}

	useEffect(() => {
		update()
	}, [status])

	return (
		<div className="relative flex flex-col">
			<div className="relative flex flex-row items-center gap-4">
				<h2>Apps</h2>
			</div>
			{(machineList &&
				<DnD.Section tiles={machineList} style={DnD.Styles.grid} onChange={setMachineList}
					renderItem={(machine) => (
					<DnD.Tile id={machine.id} SettingsModal={SettingsModal({ id: (machine.id as string), callback: update })}>
							<Card machine={machine} />
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

