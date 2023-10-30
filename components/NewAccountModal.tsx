"use client";

import useNewAccountModal from "@/hooks/useNewAccountModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useAccounts } from "@/hooks/useAccounts";

const NewAccountModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const newAccountModal = useNewAccountModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { fetchAccounts } = useAccounts(user?.id);

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            user_id: '',
            description: '',
            current_amount: 0,
            created_at: '',
            updated_at: ''
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            newAccountModal.onClose();
        }
    }

    if (!user) {
        // TODO: implement toast 'must be logged in'
        console.log("You must be logged in to create a new account!");
        return null;
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const {
                data: accountData,
                error: accountError
            } = await supabaseClient
                .from('account')
                .insert([
                    {
                        user_id: user.id,
                        description: values.description,
                        current_amount: values.current_amount,
                    }
                ]);

            if (accountError) {
                setIsLoading(false);
                return // TODO: toast error
            }

            setIsLoading(false);
            // TODO: toast success
            reset();
            newAccountModal.onClose();
            router.refresh();
            window.location.reload();
        } catch (error) {
            // TODO: toast error
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title='New account'
            description="Create a new account"
            isOpen={newAccountModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-y-4'
            >
                <Input
                    id="description"
                    disabled={isLoading}
                    {...register('description', { required: true })}
                    placeholder="Account description"
                />
                <div
                    className="
                        flex
                        items-center
                        justify-end
                        border
                        border-transparent
                        rounded-md
                        bg-neutral-300
                        dark:bg-neutral-700
                    "
                >
                    <Input
                        id="current_amount"
                        disabled={isLoading}
                        {...register('current_amount', { required: true })}
                        placeholder="0"
                        className="w-full text-right dark:text-neutral-400"
                    />
                    <span className="
                            pr-3
                            pl-1
                            text-neutral-600 
                            dark:text-neutral-400
                        ">$</span>
                </div>
                <Button disabled={isLoading} type='submit'>
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default NewAccountModal;