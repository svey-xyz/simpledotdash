'use client'

import React from 'react';
import { Button as HeadlessButton } from '@headlessui/react'

type Props = {
	Icon?: React.JSX.ElementType;
	title?: string;
	handler?: (props?:{}) => Promise<void>;
	method?: string;
	className?: string;
};


export const Button = ({ Icon, title, handler, method, className }: Props) => {
	return (
		<HeadlessButton onClick={handler} formMethod={method} className={`${className}`}>
			{ Icon &&
				<Icon className="text-fg relative data-[hover]:scale-[1.1] h-icon w-icon" />
			}
			{ title &&
				<span>{title}</span>
			}
		</HeadlessButton>
	);
};