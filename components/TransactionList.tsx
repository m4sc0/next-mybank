"use client";

import { useTransactions } from '@/hooks/useTransactions';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'
import TransactionItem from './TransactionItem';
import HR from './HR';
import { Transaction } from '@/types';
import useNewTransactionModal from '@/hooks/useNewTransactionModal';
import { BsPlus } from 'react-icons/bs';

interface TransactionListProps {
    account_id: number
}

type SortField = 'description' | 'transferred_at' | 'amount';

const TransactionList: React.FC<TransactionListProps> = ({
    account_id
}) => {
    const { transactions, isLoading, fetchTransactions } = useTransactions(account_id);
    const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>([]);
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const newTransactionModal = useNewTransactionModal();

    const sortTransactions = () => {
        if (!sortField) return;
        const sorted = [...transactions].sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setSortedTransactions(sorted);
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const refreshTransactions = async () => {
        fetchTransactions();
        setSortedTransactions(transactions);
    }

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return <FaSort />;
        return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
    };

    useEffect(() => {
        if (sortField) {
            sortTransactions();
        } else {
            setSortedTransactions(transactions);
        }
    }, [transactions, sortField, sortOrder, sortTransactions]);

    return (
        <div
            className='
                w-3/4
                p-3
                container
                mx-auto
                
            '
        >
            <div
                className='
                    flex
                    items-center
                    justify-between
                    mb-4
                '
            >
                <h1
                    className='
                        text-4xl
                        font-semibold
                        text-neutral-400
                        dark:text-neutral-600
                    '
                >
                    Recent transactions
                </h1>
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
                    onClick={newTransactionModal.onOpen}
                >
                    <span>New Transaction</span>
                    <BsPlus
                        size={25}
                    />
                </button>
            </div>

            <div className='flex flex-col w-full'>
                <div className='flex mb-2 justify-between w-full'>
                    <div className="p-2 dark:text-neutral-300 font-bold w-2/3 items-center text-left">
                        Description
                        <button className="px-2 items-center" onClick={() => handleSort('description')}>{getSortIcon('description')}</button>
                    </div>
                    <div className="p-2 dark:text-neutral-300 font-bold w-1/3 items-center text-right">
                        Transferred at
                        <button className="px-2 items-center" onClick={() => handleSort('transferred_at')}>{getSortIcon('transferred_at')}</button>
                    </div>
                    <div className="p-2 dark:text-neutral-300 font-bold w-1/3 items-center text-right">
                        Amount
                        <button className="px-2 items-center" onClick={() => handleSort('amount')}>{getSortIcon('amount')}</button>
                    </div>
                </div>

                {sortedTransactions.map((transaction) => (
                    <React.Fragment key={transaction.id}>
                        <HR full className="bg-neutral-900" />
                        <TransactionItem
                            data={transaction}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default TransactionList