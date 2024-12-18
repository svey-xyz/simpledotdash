'use client'

import React, { CSSProperties, PropsWithChildren, createContext, useMemo, useState } from "react";
import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable"
import { useSession } from "next-auth/react";
import { AdjustmentsHorizontalIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Settings } from "@components/Apps/Settings";
import { Modal } from "@components/ui/Modal";


interface Props {
	id: UniqueIdentifier;
	removeItem?: (id: string) => void;
	updateItem?: () => void;

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

export const Tile = ({ children, id, removeItem, updateItem }: PropsWithChildren<Props>) => {
	const session = useSession()
	const user = session.data?.user
	const editMode = user?.editing

	const [visibility, setVisibility] = useState<boolean>(false)

	
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

	const removeTile = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		if (removeItem) removeItem(id as string)
	}

	return (
		<SortableItemContext.Provider value={context} >
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				className="relative"
			>
				<div className={`absolute rounded-full backdrop-blur-md z-50 top-0 right-0 bg-accent-failure/40
					${editMode ? 'visible' : 'hidden'}`}>
					<Modal icon={AdjustmentsHorizontalIcon} className="p-1" visibility={visibility} setVisibility={setVisibility}>
						<Settings appID={id as string} handleUpdate={updateItem} modalStateVisibility={setVisibility}/>
					</Modal>
				</div>
				<div {...(editMode ? listeners : {})}>
					<div className={`${editMode ? 'pointer-events-none' : 'pointer-events-auto'}`}>
						{children}
					</div>
				</div>
			</div>
		</SortableItemContext.Provider>
	)
}