import removeAccount from '@/actions/removeAccount';
import { useUser } from '@/hooks/useUser';
import { Account } from '@/types';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoMdClose } from "react-icons/io";

interface AccountItemProps {
    data: Account;
    removeAcc: (account: Account) => void;
    setAccount: (account_id: number) => void;
    isSelected: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({
    data,
    removeAcc,
    setAccount,
    isSelected
}) => {
    const updatedDate = new Date(data.updated_at);
    const router = useRouter();

    const formattedDate = updatedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }) + ' ' + updatedDate.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });

    const amount = data.current_amount;
    const mainAmount = Math.floor(amount).toLocaleString();
    const decimalAmount = (amount % 1).toFixed(2).substring(2);

    const handleCloseBtn = () => {
        removeAcc(data);
        router.refresh();
    }

    return (
        <div className={`
            relative
            p-6
            rounded-md
            flex
            flex-col
            gap-8
            border ${isSelected ? 'border-neutral-900 dark:border-neutral-100' : 'border-transparent'}
            transition-all duration-300 ease-in-out
            ${isSelected ? 'bg-violet-500' : 'bg-neutral-300 dark:bg-neutral-800'}
            shadow-md
        `}
            onClick={() => {
                setAccount(data.id);
            }}
        >
            <h2
                className={`
                    transition
                    ${isSelected ? 'dark:text-neutral-300 text-neutral-700 font-semibold' : 'text-neutral-500'}
                    text-xl
                `}
            >
                {data.description}
            </h2>
            <div
                className='
                    flex
                    justify-between
                    items-end
                '
            >
                <p
                    className={`
                        text-sm
                        transition
                        ${isSelected ? 'text-neutral-700 dark:text-neutral-300 font-semibold' : 'text-neutral-500'}
                    `}
                >Last update: <br/> {formattedDate}</p>
                <div className="flex items-end">
                    <h1 className='
                            text-4xl
                            font-bold
                            text-black
                            dark:text-white
                        '
                    >
                        € {mainAmount}
                    </h1>
                    <span className='
                            text-xl
                            font-bold
                            text-black
                            dark:text-white
                        '
                    >
                        {decimalAmount}
                    </span>
                </div>
            </div>
            <button
                className={`
                    text-neutral-400
                    hover:text-neutral-600
                    dark:text-neutral-600
                    hover:dark:text-neutral-400
                    transition
                    absolute
                    top-[25px]
                    right-[25px]
                    inline-flex
                    h-[25px]
                    w-[25px]
                    appearance-none
                    items-center
                    justify-center
                    rounded-full
                    focus:outline-none
                    ${isSelected ? 'dark:text-neutral-100' : ''}
                    
                `}
                // TODO: implement closing an account
                onClick={handleCloseBtn}
            >
                <IoMdClose size={25} />
            </button>
        </div>
    )
    
}

export default AccountItem;
