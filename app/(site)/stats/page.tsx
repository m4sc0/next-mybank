"use client";

import getAccountsByUser from "@/actions/getAccountsByUser";
import AccountList from "@/components/AccountList";
import HR from "@/components/HR";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { useUser } from "@/hooks/useUser";
import { Account } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function StatsPage() {
    const theme = window.localStorage.getItem('theme');

    const { user } = useUser();

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
        <div
            className={`
                ${theme}
                w-full
                flex
                flex-col
                items-center
                justify-center
                gap-10
            `}
        >
            <Head>
                <link rel='stylesheet' href='/spinner.css' />
            </Head>
            <Header />
            {isLoading ? (
                <div className="w-full h-64 flex justify-center items-center">
                    <span className="loader"></span>
                </div>
            ) : (
                user ? (
                    <>
                        <AccountList id={user?.id} accounts={accounts} setCurAccount={setCurAccount} />
                        <HR className='my-6' />
                    </>
                ) : (
                    <h1>Please login to use the analytical feature</h1>
                )
            )}

            <Navbar />
        </div>
    )
}