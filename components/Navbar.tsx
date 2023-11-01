import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

interface NavbarProps {
	isOpen?: boolean;
	className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
	isOpen,
	className
}) => {
	const thirdOccurence = (input: string, char: string) => {
		let count = 0;

		for (let i = 0; i < input.length; i++) {
			if (input[i] === char) {
				count++;

				if (count === 3) {
					return i;
				}
			}
		}

		return -1;
	}

	const router = useRouter();
	const [currentPath, setCurrentPath] = useState('');

	const [items, setItems] = useState([
		{
			name: 'Home',
			href: '/',
			current: false,
		},
		{
			name: 'Statistics',
			href: '/stats',
			current: false,
		},
	]);

	useEffect(() => {
		setCurrentPath(window.location.href.substring(thirdOccurence(window.location.href, '/')));

		setItems((prevItems) => (
			prevItems.map((item) => ({
				...item,
				current: item.href === currentPath,
			}))
		));
	}, [currentPath]);

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
		after:hover:scale-x-100
		after:transition
		after:duration-300
		after:origin-center
		${className}
		${isOpen ? 'w-full text-center' : ''}
	`;

	const pageChange = (href: string) => {
		router.push(href);
		router.refresh();
	}

	return (
		<div
			className={`
				flex
				flex-row
				gap-10
				items-center
				justify-around
				${isOpen ? 'flex' : 'hidden'} md:flex
				${className}
			`}
		>
			{items.map((item) => (
				<div 
					onClick={() => { pageChange(item.href) }} 
					key={item.name} 
					className={`
						${itemStyles()}
						cursor-pointer 
						${item.current ? 'after:scale-x-100' : 'after:scale-x-0'}
						block md:inline-block
						mb-2 md:mb-0
					`}
				>
					{item.name}
				</div>
			))}
		</div>
	)
}

export default Navbar