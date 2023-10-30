import { Account, Transaction, UserDetails } from "@/types";
import { supabase } from "@/utils/supabaseClient";

const getTransactionsByAccount = async (account_id: number): Promise<Transaction[]> => {
    if (!account_id) {
        return [];
    }

    const { data, error } = await supabase
        .from('transaction')
        .select('*')
        .eq('account_id', account_id)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.log(error);
        return [];
    }

    return data || [];
}

export default getTransactionsByAccount;