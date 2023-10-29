// actions/getAccountsByUser.ts
import { supabase } from '@/utils/supabaseClient';
import { Account, UserDetails } from '@/types'; // Import your Account type

const getAccountsByUser = async (user: UserDetails): Promise<Account[]> => {
    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from('account')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.log(error);
        return [];
    }

    return data || [];
}

export default getAccountsByUser;
