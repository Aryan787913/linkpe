import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Profile {
  id: string
  username: string
  bio: string | null
  avatar_url: string | null
  is_pro: boolean
  created_at: string
}

export interface Link {
  id: string
  user_id: string
  title: string
  url: string
  position: number
  clicks: number
  created_at: string
}
