import React, { FC } from 'react';
import { PropsWithChildren } from 'react';

type Props = {
	columns: number;
};

export const Grid: FC<PropsWithChildren<Props>> = ({ children, columns }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				gridGap: 10,
				// maxWidth: '800px',
				// margin: '100px auto',
			}}
		>
			{children}
		</div>
	);
};
