'use client'

import React, { CSSProperties, PropsWithChildren, createContext, useMemo } from "react";
import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable"
import { useSession } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/solid"
import { removeApp } from "@lib/db.actions";
import { App } from '@prisma/client';
import { revalidatePath } from "next/cache";


interface Props {
	id: UniqueIdentifier;
	app: App
}



interface Context {
	attributes: Record<string, any>;
	listeners: DraggableSyntheticListeners;
	ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
	attributes: {},
	listeners: undefined,
	ref() { }
});

export const Tile = ({ children, id, app }: PropsWithChildren<Props>) => {
	const session = useSession()
	const user = session.data?.user
	const editMode = user?.editing
	
	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition
	} = useSortable({ id });

	const context = useMemo(
		() => ({
			attributes,
			listeners: editMode ? listeners : {},
			ref: setActivatorNodeRef,
		}),
		[attributes, listeners, setActivatorNodeRef]
	);

	const style: CSSProperties = {
		opacity: isDragging ? 0.4 : undefined,
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition
	};

	const deleteAppCard = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		await removeApp(app, user.id)
	}

	return (
		<SortableItemContext.Provider value={context} >
			<div className="relative">
				
				<div
					ref={setNodeRef}
					style={style}
					{...attributes}
					className="relative"
				>
					<div
						className={`absolute rounded-full backdrop-blur-md z-50 top-0 right-0 bg-accent-failure/40 border border-solid border-accent-failure translate-x-1/4 -translate-y-1/4 pointer-events-auto
					${editMode ? 'visible' : 'hidden'}`}
						onClick={deleteAppCard}
					>
						<XMarkIcon className="w-icon h-icon text-accent-failure" />
					</div>
					<div {...(editMode ? listeners : {})}>
						<a

							className={`group relative flex flex-row border border-transparent-accent rounded-lg py-4 px-6 overflow-hidden
							before:absolute before:inset-0 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-[rgba(17, 25, 40, 0.75)]
							${editMode ? 'pointer-events-none' : 'pointer-events-auto'}
							`}
							href={app.url}
							target="_blank"
						>
							<div className="relative">
								<h4 className='font-bold'>{app.title}</h4>
								<span className="font-thin">{app.displayURL}</span>
							</div>
						</a>
					</div>
					
				</div>
			</div>
		</SortableItemContext.Provider>
	)
}