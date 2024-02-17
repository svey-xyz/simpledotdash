// 'use client'

import React, { ReactNode, useMemo, useState } from "react";
import { app } from "../lib/data.schema";
// import AppCard from "@components/AppCard";
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import AppCard from "@components/AppCard";

interface BaseItem {
	id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
	apps: T[];
	onChange(items: T[]): void;
}

export default function AppSection<T extends app>({
	apps,
	onChange,
}:Props<T>) {
	const [active, setActive] = useState<Active | null>(null);
	const activeItem = useMemo(
		() => apps.find((app) => app.id === active?.id),
		[active, apps]
	);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

	return (
		<DndContext
			sensors={sensors}
			onDragStart={({ active }) => {
				setActive(active);
			}}
			onDragEnd={({ active, over }) => {
				if (over && active.id !== over?.id) {
					const activeIndex = apps.findIndex(({ id }) => id === active.id);
					const overIndex = apps.findIndex(({ id }) => id === over.id);

					onChange(arrayMove(apps, activeIndex, overIndex));
				}
				setActive(null);
			}}
			onDragCancel={() => {
				setActive(null);
			}}
		>
			<SortableContext items={apps}>
				<ul className="SortableList" role="application">
					{apps.map((app) => (
						// <React.Fragment key={app.id}>
						// 	{renderApp(app)}
							<AppCard app={app} key={app.id} />
						// </React.Fragment>
					))}
				</ul>
			</SortableContext>
			{/* <div className="relative" ref={setNodeRef} style={style}>
				{apps.map((app, i, arr) => {
					return (app && <AppCard app={app} key={app.title} />)
				})}
			</div> */}
		</DndContext>
	)
}

AppSection.App = AppCard;