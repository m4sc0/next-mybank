"use client";

import getAccountsByUser from '@/actions/getAccountsByUser';
import AccountList from '@/components/AccountList'
import Header from '@/components/Header'
import { useUser } from '@/hooks/useUser';
import { Account } from '@/types';
import { useEffect, useState } from 'react';

export default function Home() {
	const { user } = useUser();
	const [accounts, setAccounts] = useState<Account[]>([]);

	useEffect(() => {
		if (user) {
			getAccountsByUser(user).then(setAccounts);
		}
	}, [user])

	return (
		<div className='
			w-full
			flex
			flex-col
			items-center
			justify-center
			gap-6
		'>
			<Header />
			{user ? (
				<AccountList accounts={accounts} />
			) : (
					<h1 className='
					mt-20
					text-4xl
                    font-semibold
                    text-neutral-400
                    dark:text-neutral-600
					'>Please login to use all features!</h1>
			)}
		</div>
	)
}
