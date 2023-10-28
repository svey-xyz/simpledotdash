import React from "react";

export default function Header() {
	return (
		<header className='relative top-0 left-0 right-0 max-w-screen h-fit'>
			<div className="relative h-full flex flex-col items-center justify-center pt-12">
				<div className="main-padding flex flex-row items-center justify-between z-50">
					<h1 className='w-full relative pb-4 separator'>Title</h1>
				</div>
			</div>
		</header>
	)
}