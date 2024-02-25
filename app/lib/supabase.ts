import { createClient } from "@supabase/supabase-js"
import Config from "react-native-config"
import { Database } from "./db_types"

const supabaseUrl = Config.SUPABASE_URL || ""
const supabaseAnonKey = Config.SUPABASE_ANON_KEY || ""

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
