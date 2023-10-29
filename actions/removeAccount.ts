import { useUser } from "@/hooks/useUser";
import { Account, UserDetails } from "@/types";
import { supabase } from "@/utils/supabaseClient";

const removeAccount = async (account: Account) => {
    const { error } = await supabase
        .from('account')
        .delete()
        .eq('user_id', account.user_id)
        .eq('id', account.id);
    
    if (error) {
        console.log(error);
        return 500;
    }

    return 204;
}

export default removeAccount;