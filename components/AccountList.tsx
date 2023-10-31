import { Account } from '@/types'
import React, { useState } from 'react'
import AccountItem from './AccountItem';
import { BsPlus } from "react-icons/bs";
import { TbReload } from "react-icons/tb";
import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';
import useNewAccountModal from '@/hooks/useNewAccountModal';
import { useAccounts } from '@/hooks/useAccounts';
import removeAccount from '@/actions/removeAccount';
import { useRouter } from 'next/navigation';

interface AccountListProps {
    id: string | undefined;
    setCurAccount: (account_id: number) => void;
    className?: string;
}

const AccountList: React.FC<AccountListProps> = ({
    id,
    setCurAccount,
    className
}) => {
    const user = useUser();
    const authModal = useAuthModal();
    const newAccountModal = useNewAccountModal();
    const router = useRouter();
    const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);

    let { accounts, fetchAccounts } = useAccounts(id);

    const onClick = () => {
        if (!user) {
            authModal.onOpen();
            return;
        }

        console.log('open newAccountModal now!');

        return newAccountModal.onOpen();
    }

    const removeAcc = async (data: Account) => {
        removeAccount(data);
        fetchAccounts();
        router.refresh();
    }

    const handleSetAccount = (accountId: number) => {
        setSelectedAccountId(accountId);
        setCurAccount(accountId);
        localStorage.setItem('accountId', accountId.toString());
    }

    if (accounts.length === 0) {
        return (
            <div className='
                w-3/4
                p-3
                container
                flex
                items-center
                justify-between
                mb-4
            '>
                <div className='
                    flex
                    items-center
                    gap-4
                '>
                    <h1
                        className='
                        text-4xl
                        font-semibold
                        text-neutral-400
                        dark:text-neutral-600
                    '
                    >
                        No accounts yet
                    </h1>
                    <button
                        className='
                            p-3
                            transition
                            bg-neutral-300
                            dark:bg-neutral-800
                            dark:text-neutral-500
                            hover:bg-neutral-400
                            hover:dark:text-white
                            rounded-full
                            flex
                            items-center
                            gap-2
                        '
                        onClick={fetchAccounts}  // Fetch accounts again when clicked
                    >
                        <TbReload size={15} />
                    </button>
                </div>

                <button
                    className='
                        p-3
                        px-4
                        transition
                        bg-neutral-300
                        dark:bg-neutral-800
                        dark:text-neutral-500
                        hover:dark:text-white
                        rounded-md
                        flex
                        items-center
                        gap-2
                    '
                    onClick={onClick}
                >
                    <span>New Account</span>
                    <BsPlus
                        size={25}
                    />
                </button>
            </div>
        );
    }

    return (
        <div
            className={`
                w-3/4
                p-3
                container 
                mx-auto
                ${className}
            `}
        >
            <div className='
                flex
                items-center
                justify-between
                mb-4
            '>
                <div className='
                    flex
                    items-center
                    gap-4
                '>
                    <h1
                        className='
                        text-4xl
                        font-semibold
                        text-neutral-400
                        dark:text-neutral-600
                    '
                    >
                        Your Accounts
                    </h1>
                    <button
                        className='
                            p-3
                            transition
                            bg-neutral-300
                            dark:bg-neutral-800
                            dark:text-neutral-500
                            hover:bg-neutral-400
                            hover:dark:text-white
                            rounded-full
                            flex
                            items-center
                            gap-2
                        '
                        onClick={fetchAccounts}  // Fetch accounts again when clicked
                    >
                        <TbReload size={15} />
                    </button>
                </div>
                <button
                    className='
                        p-3
                        px-4
                        transition
                        bg-neutral-300
                        dark:bg-neutral-800
                        dark:text-neutral-500
                        hover:dark:text-white
                        rounded-md
                        flex
                        items-center
                        gap-2
                    '
                    onClick={onClick}
                >
                    <span>New Account</span>
                    <BsPlus
                        size={25}
                    />
                </button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {accounts.map((account) => (
                    <AccountItem
                        key={account.id}
                        data={account}
                        removeAcc={removeAcc}
                        setAccount={handleSetAccount}
                        isSelected={account.id === selectedAccountId}
                    />
                ))}
            </div>
        </div>
    );

}

export default AccountList