'use client'

import React from 'react';

type Props = {
	Icon?: React.JSX.ElementType;
	title?: string;
	handler?: (props?:{}) => Promise<void>;
	method?: string;
	className?: string;
};


export const Button = ({ Icon, title, handler, method, className }: Props) => {
	return (
		<button onClick={handler} formMethod={method} className={`${className}`}>
			{ Icon &&
				<Icon className="text-fg relative group-hover:scale-[1.1] h-icon w-icon max-h-full" />
			}
			{ title &&
				<span>{title}</span>
			}
		</button>
	);
};