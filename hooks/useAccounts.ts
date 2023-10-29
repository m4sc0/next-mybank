import { Account } from "@/types";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export const useAccounts = (userId: string | undefined) => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAccounts = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('account')
                .select('*')
                .eq('user_id', userId);
            if (error) {
                console.error(error)
                // TODO: toast error
            }
            setAccounts(data || []);
        } catch (error) {
            console.error(error);
            // TODO: toast error
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userId) fetchAccounts();
    }, [userId]);

    return { accounts, fetchAccounts, isLoading };
}