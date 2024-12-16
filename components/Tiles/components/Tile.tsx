'use client'

import React, { CSSProperties, PropsWithChildren, createContext, useMemo } from "react";
import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable"
import { useSession } from "next-auth/react";
import { XMarkIcon } from "@heroicons/react/24/solid"

interface Props {
	id: UniqueIdentifier;
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

export const Tile = ({ children, id }: PropsWithChildren<Props>) => {
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

	return (
		<SortableItemContext.Provider value={context} >
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...(editMode ? listeners : {})}
				className="relative"
			>
				<div className={`absolute rounded-full backdrop-blur-md z-10 top-0 right-0 bg-accent-failure/40 border border-solid border-accent-failure translate-x-1/4 translate-y-1/4
					${editMode ? 'visible' : 'hidden'}`}>
					<XMarkIcon className="w-icon h-icon text-accent-failure"/>
				</div>
				{ children }
			</div>
		</SortableItemContext.Provider>
	)
}