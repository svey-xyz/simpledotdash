import React from "react";
import { Machine } from "@prisma/server/data.schema";

type Props = {
	machine: Machine
}

export const Card = ({ machine }: Props) => {

	return (
		<div
			className={`group relative flex flex-row border border-transparent-accent rounded-lg py-4 px-6 mt-4 overflow-hidden
			before:absolute before:inset-0 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-[rgba(17, 25, 40, 0.75)]
			`}
		>
			<div className="relative">
				<h4 className='font-bold'>{machine.title}</h4>
			</div>
			
		</div>
	)
}