import { Account } from '@/types'
import React from 'react'
import AccountItem from './AccountItem';
import { BsPlus } from "react-icons/bs";
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import useNewAccountModal from '@/hooks/useNewAccountModal';
import { useAccounts } from '@/hooks/useAccounts';

interface AccountListProps {
    id: string | undefined;
}

const AccountList: React.FC<AccountListProps> = ({ 
    id
}) => {
    const user = useUser();
    const authModal = useAuthModal();
    const newAccountModal = useNewAccountModal();
    const { accounts, fetchAccounts } = useAccounts(id);

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

    const onClick = () => {
        if (!user) {
            authModal.onOpen();
            return;
        }

        console.log('open newAccountModal now!');

        return newAccountModal.onOpen();
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
            <div className='
                flex
                items-center
                justify-between
                mb-4
            '>
                <h1
                    className='
                    text-4xl
                    font-semibold
                    text-neutral-400
                    dark:text-neutral-600
                '
                >
                    Account List
                </h1>

                <BsPlus
                    className="
                        text-4xl
                        text-neutral-400
                        dark:text-neutral-600
                        hover:text-neutral-600
                        hover:dark:text-neutral-400
                        transition
                        cursor-pointer
                        mr-5
                    "
                    onClick={onClick}
                />
            </div>
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