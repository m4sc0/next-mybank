import { UUID } from "crypto"

export interface UserDetails {
    id: string,
    created_at: string
}

export interface Account {
    id: number,
    user_id: UUID,
    description: string,
    current_amount: number,
    created_at: string
    updated_at: string
}

export interface Transaction {
    id: string,
    account_id: string,
    description: string,
    amount: number,
    transferred_at: string
}