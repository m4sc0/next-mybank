import { Account } from '@/types';
import React from 'react'
import { IoMdClose } from "react-icons/io";

interface AccountItemProps {
    data: Account;
}

const AccountItem: React.FC<AccountItemProps> = ({ data }) => {
    const updatedDate = new Date(data.updated_at);

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

    return (
        <div className='
            relative
            bg-neutral-300
            dark:bg-neutral-800
            p-6
            rounded-md
            flex
            flex-col
            gap-8
        '>
            <h2
                className='
                    text-neutral-500
                    text-xl
                '
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
                    className='
                        text-sm
                        text-neutral-400
                        dark:text-neutral-600
                    '
                >Last update: <br/> {formattedDate}</p>
                <div className="flex items-end">
                    <h1 className='
                            text-4xl
                            font-bold
                            text-black
                            dark:text-white
                        '
                    >
                        ${mainAmount}
                    </h1>
                    <span className='
                            text-xl
                            font-bold
                            text-black
                            dark:text-white
                        '
                    >
                        .{decimalAmount}
                    </span>
                </div>
            </div>
            <button
                className="
                    text-neutral-400
                    hover:text-neutral-600
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
                "
            >
                <IoMdClose size={25} />
            </button>
        </div>
    )
}

export default AccountItem;
