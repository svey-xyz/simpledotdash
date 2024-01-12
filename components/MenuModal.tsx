import Signin from '@components/Signin';
import React, { useState } from 'react';

const MenuModal = ({visibility, className}:{visibility:boolean, className:string}) => {
	
	return (
		<section className={`${className} right-0 w-96 z-50`}
			style={{visibility:visibility?'visible':'hidden'}}>
			<div className='relative w-full min-w-full flex flex-col justify-end items-end'>
				<div className='w-full min-w-full bg-fg/20 py-8 px-4'>
					Modal
					<Signin />
				</div>
			</div>
		</section>
		
	);
};

export default MenuModal;