import { supabase } from "./supabase"

export const fetchPosts = async () => {
  const { data, error } = await supabase.from("test").select("*")
  if (error) {
    console.error("error:", error)
    return []
  } else {
    return data
  }
}
export type Posts = Awaited<ReturnType<typeof fetchPosts>>
