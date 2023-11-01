import React, { useState } from 'react'
import { RiHome3Fill, RiHome3Line } from "react-icons/ri";
import { IoStatsChartOutline, IoStatsChartSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
	const router = useRouter();

	const items = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Statistics',
			href: '/stats'
		}
	]

	const itemStyles = () => `
		text-neutral-900
		dark:text-white
		relative
		w-fit
		block
		after:block
		after:content-['']
		after:absolute
		after:h-[3px]
		after:bg-white
		after:w-full
		after:scale-x-0
		after:hover:scale-x-100
		after:transition
		after:duration-300
		after:origin-center
	`

	return (
		<div
			className='
				w-1/6
				flex
				items-center
				justify-around
			'
		>
			{items.map((item) => {
				return (
					<Link href={item.href} key={item.name} className={itemStyles()}>
						{item.name}
					</Link>
				);
			})}
		</div>
	)
}

export default Navbar