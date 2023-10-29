export interface UserDetails {
    id: string,
    name: string,
    password: string,
    created_at: Date
}

export interface Account {
    id: string,
    user_id: string,
    description: string,
    current_value: number,
    created_at: Date
    updated_at: Date
}

export interface Transaction {
    id: string,
    account_id: string,
    description: string,
    amount: number,
    transferred_at: Date
}