"use client";

import React, { useEffect } from 'react'
import Modal from './Modal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';
import { useTheme } from '@/providers/ThemeContext';

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
    const { theme } = useTheme();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                theme={theme}
                providers={['github']}
                magicLink
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#7c3aed',
                                brandAccent: '#4d4d4d'
                            }
                        }
                    }
                }}
            />
        </Modal>
    )
}

export default AuthModal