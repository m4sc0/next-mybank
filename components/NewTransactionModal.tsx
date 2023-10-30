import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useNewTransactionModal from "@/hooks/useNewTransactionModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface IFormInput {
    description: string;
    amount: number;
    sign: "+" | "-";
}
const NewTransactionModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const newTransactionModal = useNewTransactionModal();
    const { register, handleSubmit, reset } = useForm<IFormInput>();
    const supabaseClient = useSupabaseClient();

    const onClose = () => {
        reset();
        newTransactionModal.onClose();
    };

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true);
        try {
            const accountId = localStorage.getItem('accountId');

            console.log(accountId);

            if (!accountId) {
                console.error('No account chosen');
                return;
            }

            const { data: accountData, error: fetchError } = await supabaseClient
                .from('account')
                .select('current_amount')
                .eq('id', accountId)
                .single();

            if (fetchError) throw fetchError;

            if (!accountData) throw new Error('Account not found');

            const newAmount = data.sign === '+' ? accountData.current_amount + data.amount : accountData.current_amount - data.amount;

            const { error: updateError } = await supabaseClient
                .from('account')
                .update({ current_amount: newAmount })
                .eq('id', accountId);

            if (updateError) throw updateError;

            const { error: insertError } = await supabaseClient
                .from('transaction')
                .insert([
                    {
                        account_id: accountId,
                        description: data.description,
                        amount: data.amount,
                        sign: data.sign
                    }
                ]);
            
            if (insertError) throw insertError;

            console.log("Transaction added successfully!");
            onClose();
        } catch (error) {
            console.error("Failed to add transaction", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="New Transaction"
            description="Add a new transaction"
            isOpen={newTransactionModal.isOpen}
            onChange={newTransactionModal.onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                <Input
                    id="description"
                    {...register("description", { required: true })}
                    placeholder="Description"
                    disabled={isLoading}
                />
                <div className="flex items-center gap-2">
                    <div className="flex-1
                        flex
                        items-center
                        justify-end
                        border
                        border-transparent
                        rounded-md
                        bg-neutral-300
                        dark:bg-neutral-700
                    ">
                        <Input
                            id="amount"
                            type="text"
                            {...register("amount", { required: true })}
                            placeholder="Amount"
                            disabled={isLoading}
                            className="w-full text-right dark:text-neutral-400"
                        />
                        <span className="
                            pr-3
                            pl-1
                            text-neutral-600 
                            dark:text-neutral-400
                        ">$</span>
                    </div>
                    <select
                        {...register("sign", { required: true })}
                        disabled={isLoading}
                        className="
                            p-2
                            py-3
                            border
                            rounded-md
                            cursor-pointer
                            text-neutral-600
                            dark:text-neutral-400
                            bg-neutral-300
                            dark:bg-neutral-700
                            transition
                            hover:bg-neutral-400
                            dark:hover:bg-neutral-600
                        "
                    >
                        <option value="+">+</option>
                        <option value="-">-</option>
                    </select>

                </div>
                <Button type="submit" disabled={isLoading}>
                    Add Transaction
                </Button>
            </form>
        </Modal>
    );
};

export default NewTransactionModal;
