import React, { useState } from 'react';
import useAuthModal from '@/hooks/useAuthModal';
import { useTheme } from '@/providers/ThemeContext';
import Link from 'next/link'
import { BiSolidMoon, BiSolidSun, BiMenu, BiX } from "react-icons/bi";
import LoginButton from './LoginButton';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import Button from './Button';
import Navbar from './Navbar';
import HR from './HR';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
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
                container
                w-full
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
                flex-col md:flex-row
                items-center
                md:justify-between
                gap-2
            '
        >
            <div className='w-full md:w-fit flex justify-between md:justify-start'>
                <button className='text-2xl font-bold' onClick={() => router.push('/')}>MyBank</button>
                <button className='md:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <BiX size={25} /> : <BiMenu size={25} />}
                </button>
            </div>
            <div className={`block ${menuOpen ? 'block' : 'hidden'} md:flex flex-row items-center md:justify-between`}>
            </div>
            <Navbar isOpen={menuOpen} className={`block ${menuOpen ? 'block' : 'hidden'} md:ml-auto`} />
            <HR className={`block ${menuOpen ? 'block' : 'hidden'} md:hidden`} />
            {user ? (
                <div className={`block ${menuOpen ? 'block' : 'hidden'} md:block w-full md:w-fit md:ml-auto`}>
                    <Button
                        onClick={handleLogout}
                        className='
                                w-full
                                md:w-fit
                                md:ml-auto
                                bg-red-500
                                text-black
                                dark:bg-red-500
                                dark:text-white
                                hover:bg-red-600
                                hover:dark:bg-red-600
                            '
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className={`flex ${menuOpen ? 'block' : 'hidden'} md:flex md:w-fit md:ml-auto`}>
                    <LoginButton onClick={authModal.onOpen} className='
                            bg-transparent
                            text-black
                            dark:bg-transparent
                            dark:text-white
                            hover:bg-transparent
                            hover:underline
                            hover:dark:bg-transparent
                            md:mr-2
                        '
                    >
                        Sign up
                    </LoginButton>
                    <LoginButton
                        onClick={authModal.onOpen}
                    >Login</LoginButton>
                </div>
            )}
            <button onClick={toggleTheme} className={`block ${menuOpen ? 'block' : 'hidden'} w-full md:w-fit flex md:flex justify-center bg-neutral-300 dark:bg-neutral-700 md:bg-transparent md:dark:bg-transparent py-2 rounded-md mt-2 md:m-0 md:ml-4`}>
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
    )
}

export default Header;
