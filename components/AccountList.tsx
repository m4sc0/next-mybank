import { Account } from '@/types'
import React from 'react'
import AccountItem from './AccountItem';

interface AccountListProps {
    accounts: Account[];
}

const AccountList: React.FC<AccountListProps> = ({
    accounts
}) => {
    if (accounts.length === 0) {
        return (
            <div
                className='
                    w-3/4
                    p-3
                    text-4xl
                    font-semibold
                    text-neutral-400
                    dark:text-neutral-600
                '
            >
                No accounts to display.
            </div>
        );
    }

    return (
        <div
            className='
                w-3/4
                p-3
                container 
                mx-auto
            '
        >
            <h1
                className='
                    text-4xl
                    font-semibold
                    text-neutral-400
                    dark:text-neutral-600
                    mb-4
                '
            >
                Account List
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {accounts.map((account) => (
                    <AccountItem
                        key={account.id}
                        data={account}
                    />
                ))}
            </div>
        </div>
    );
}

export default AccountList