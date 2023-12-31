"use client";

import AuthModal from '@/components/AuthModal';
import NewAccountModal from '@/components/NewAccountModal'; 
import NewTransactionModal from '@/components/NewTransactionModal';
import Modal from '@/components/Modal';
import React, { useEffect, useState } from 'react'

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <NewAccountModal />
            <NewTransactionModal />
        </>
    )
}

export default ModalProvider