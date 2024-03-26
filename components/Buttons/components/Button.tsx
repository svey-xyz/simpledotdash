'use client'

import React from 'react';
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';
import Image from 'next/image';

type Props = {
	Icon: React.JSX.ElementType;
	handler: (props?:{}) => Promise<void>;
	method?: string;
};


export const Button = ({ Icon, handler, method }: Props) => {
	return (
		<button onClick={handler} formMethod={method}>
			<Icon className="text-fg relative group-hover:scale-[1.1] h-icon w-icon" />
		</button>
	);
};