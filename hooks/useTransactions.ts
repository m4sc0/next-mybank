import { Transaction } from "@/types"
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react"

export const useTransactions = (accountId: number | undefined) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('transaction')
                .select('*')
                .eq('account_id', accountId)
                .order('transferred_at', { ascending: false })
            
            if (error) {
                console.error(error);
            }
            setTransactions(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (accountId) fetchTransactions();
    }, [accountId]);

    return { transactions, setTransactions, isLoading, fetchTransactions };
}