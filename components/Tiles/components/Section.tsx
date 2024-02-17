import React, { useMemo, useState, ReactNode } from "react";

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

import { Tile } from "./Tile";

interface BaseItem {
	id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
	tiles: T[];
	onChange(items: T[]): void;
	renderItem(item: T): ReactNode;
}

export const Section = <T extends BaseItem>({
	tiles,
	onChange,
	renderItem,
}: Props<T>) => {
	const [active, setActive] = useState<Active | null>(null);
	const activeItem = useMemo(
		() => tiles.find((tile) => tile.id === active?.id),
		[active, tiles]
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
					const activeIndex = tiles.findIndex(({ id }) => id === active.id);
					const overIndex = tiles.findIndex(({ id }) => id === over.id);

					onChange(arrayMove(tiles, activeIndex, overIndex));
				}
				setActive(null);
			}}
			onDragCancel={() => {
				setActive(null);
			}}
		>
			<SortableContext items={tiles}>
				<ul className="SortableList" role="application">
					{tiles.map((tile) => (
						<React.Fragment key={tile.id}>{renderItem(tile)}</React.Fragment>
					))}
				</ul>
			</SortableContext>
		</DndContext>
	)
}

Section.Tile = Tile;