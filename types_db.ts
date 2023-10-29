export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      account: {
        Row: {
          created_at: string
          current_amount: number
          description: string
          id: number
          updated_at: string
          user_id: number | null
        }
        Insert: {
          created_at?: string
          current_amount?: number
          description?: string
          id?: number
          updated_at?: string
          user_id?: number | null
        }
        Update: {
          created_at?: string
          current_amount?: number
          description?: string
          id?: number
          updated_at?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "account_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction: {
        Row: {
          account_id: number
          amount: number
          description: string | null
          id: number
          transferred_at: string
        }
        Insert: {
          account_id: number
          amount?: number
          description?: string | null
          id?: number
          transferred_at?: string
        }
        Update: {
          account_id?: number
          amount?: number
          description?: string | null
          id?: number
          transferred_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "account"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          created_at: string
          id: number
          password: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          password?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          password?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
