"use client";

import useAuthModal from '@/hooks/useAuthModal';
import { useTheme } from '@/providers/ThemeContext';
import Link from 'next/link'
import React from 'react'
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import LoginButton from './LoginButton';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import Button from './Button';

const Header = () => {
    const authModal = useAuthModal();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();
    }

    return (
        <div
            className='
                w-3/4
                max-w-[1450px]
                bg-white
                text-black
                border-b-2
                border-solid
                border-b-neutral-900/20
                dark:bg-neutral-900
                dark:text-white
                dark:border-b-neutral-100/20
                p-4
                flex
                items-center
                justify-between
            '
        >
            <button className='text-2xl font-bold' onClick={() => router.push('/')}>MyBank</button>
            <div
                className='flex gap-2 items-center'
            >
                {user ? (
                    <>
                        <Button
                            onClick={handleLogout}
                            className='
                                bg-transparent
                                text-black
                                dark:bg-transparent
                                dark:text-white
                                hover:bg-transparent
                                hover:underline
                                hover:dark:bg-transparent
                            '
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <LoginButton onClick={authModal.onOpen} className='
                            bg-transparent
                            text-black
                            dark:bg-transparent
                            dark:text-white
                            hover:bg-transparent
                            hover:underline
                            hover:dark:bg-transparent
                        '
                        >
                            Sign up
                        </LoginButton>
                            <LoginButton
                                onClick={authModal.onOpen}
                            >Login</LoginButton>
                    </>
                )}
                <button onClick={toggleTheme} className='pl-6'>
                    {theme === 'dark' ?
                        // Add light theme button
                        (<BiSolidSun
                            size={25}
                        />)
                        :
                        // Add dark theme button
                        (<BiSolidMoon
                            size={25}
                        />)
                    }
                </button>
            </div>
        </div>
    )
}

export default Header