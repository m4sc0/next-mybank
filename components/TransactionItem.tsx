import useNewTransactionModal from '@/hooks/useNewTransactionModal';
import { Transaction } from '@/types'
import { useRouter } from 'next/navigation';
import React from 'react'

interface TransactionItemProps {
    data: Transaction;
    className?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
    data,
    className
}) => {
    const updatedDate = new Date(data.transferred_at);

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

    const amount = data.amount;
    const mainAmount = Math.floor(amount).toLocaleString();
    const decimalAmount = (amount % 1).toFixed(2).substring(2);

    return (
        <div className={`flex justify-between ${className}
            rounded
            hover:bg-neutral-300
            hover:dark:bg-neutral-800
            cursor-pointer
        `}
            onClick={() => { }}
        >
            <div className="dark:text-neutral-300 p-2 w-2/3">{data.description}</div>
            <div className="dark:text-neutral-300 p-2 w-1/3 text-right">{formattedDate}</div>
            <div className={`${data.sign === '+' ? 'text-green-500' : 'text-red-500'} p-2 w-1/3 text-right`}>{mainAmount},{decimalAmount}</div>
            <div className={`${data.sign === '+' ? 'text-green-500' : 'text-red-500'} p-2 w-10`}>{data.sign}</div>
        </div>
    )
}

export default TransactionItem
