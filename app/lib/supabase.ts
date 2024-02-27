import { createClient } from "@supabase/supabase-js"
import Config from "react-native-config"
import { Database } from "./db_types"
import AsyncStorage from "@react-native-async-storage/async-storage"

const supabaseUrl = Config.SUPABASE_URL ?? ""
const supabaseAnonKey = Config.SUPABASE_ANON_KEY ?? ""

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
