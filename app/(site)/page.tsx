"use client";

import getAccountsByUser from '@/actions/getAccountsByUser';
import AccountList from '@/components/AccountList'
import HR from '@/components/HR';
import Header from '@/components/Header'
import Navbar from '@/components/Navbar';
import TransactionList from '@/components/TransactionList';
import { useUser } from '@/hooks/useUser';
import { Account } from '@/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import '../styles.css';
import { useTheme } from '@/providers/ThemeContext';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';

export default function Home() {
	const { user } = useUser();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [curAccount, setCurAccount] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			if (user) {
				setIsLoading(true);
				getAccountsByUser(user).then(accounts => {
					setAccounts(accounts);
					setIsLoading(false);
				});
			} else {
				setIsLoading(false);
			}
		}, 1000);
	}, [user]);

	return (
		<div className={`
			w-full
			container
			mx-auto
			flex
			flex-col
			items-center
			justify-center
			gap-10
		`}>
			<Head>
				<link rel='stylesheet' href='/navbar.css' />
				<link rel='stylesheet' href='/spinner.css' />
			</Head>
			<Header />
			{isLoading ? (
				<Spinner />
			) : (
				user ? (
					<>
						<AccountList id={user?.id} accounts={accounts} setCurAccount={setCurAccount} />
						<HR className='my-6' />
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
				)
			)}
		</div>
	)
}
