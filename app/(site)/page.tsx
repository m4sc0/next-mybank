"use client";

import AccountList from '@/components/AccountList'
import HR from '@/components/HR';
import Header from '@/components/Header'
import TransactionList from '@/components/TransactionList';
import { useUser } from '@/hooks/useUser';
import { useEffect, useState } from 'react';

export default function Home() {
	const { user } = useUser();
	// const [accounts, setAccounts] = useState<Account[]>([]);
	// const {accounts, fetchAccounts} = useAccounts(user?.id);

	// useEffect(() => {
	// 	if (user) {
	// 		getAccountsByUser(user).then(setAccounts);
	// 	}
	// }, [user])

	const [curAccount, setCurAccount] = useState(0);

	return (
		<div className='
			w-full
			flex
			flex-col
			items-center
			justify-center
			gap-10
		'>
			<Header />
			{user ? (
				<>
					<AccountList id={user?.id} setCurAccount={setCurAccount} />
					<HR className='my-6'/>
					<TransactionList account_id={curAccount} />
				</>
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
