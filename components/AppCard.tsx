// 'use client'

import React, { CSSProperties, PropsWithChildren, createContext, useMemo } from "react";
import { app } from "@lib/data.schema"
import { DraggableSyntheticListeners, UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
// import { useSortable } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable"

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

const SortableCard = ({ app }: {app:app}) => {
	const {
		attributes,
		isDragging,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition
	} = useSortable({ id: app.id });
	const context = useMemo(
		() => ({
			attributes,
			listeners,
			ref: setActivatorNodeRef
		}),
		[attributes, listeners, setActivatorNodeRef]
	);
	// const Icon = app.icon ? await DynamicIcon({id:app.icon}) as ElementType : undefined
	// const { attributes, listeners, setNodeRef, transform } = useDraggable({
	// 	id: app.title,
	// });

	// const style = {
	// 	// Outputs `translate3d(x, y, 0)`
	// 	transform: CSS.Transform.toString(transform),
	// };
	const style: CSSProperties = {
		opacity: isDragging ? 0.4 : undefined,
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		transition
	};
	// const style = transform ? {
	// 	transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
	// } : undefined

	return (
		<SortableItemContext.Provider value={context}>
			<div ref={setNodeRef} style={style} {...attributes} {...listeners}
				className="group relative flex flex-row border border-transparent-accent rounded-lg py-4 px-6 mt-4 overflow-hidden
					before:absolute before:inset-0 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-[rgba(17, 25, 40, 0.75)]">
				{/* {(Icon && 
					<div className="text-fg opacity-70 w-8 mr-4 group-hover:scale-[1.12] duration-100 transition-transform group-hover:opacity-100">
						<Icon />
					</div>
				)} */}
				<h4 className='relative'>{app.title}</h4>
			</div>
		</SortableItemContext.Provider>
	)
}

export default SortableCard