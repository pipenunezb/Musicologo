import { Session } from "@supabase/supabase-js"
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

export const getProfile = async (session: Session) => {
  if (!session) return
  const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id)
  if (error) {
    console.log(error)
    return null
  } else {
    return data[0]
  }
}
export type UserProfile = Awaited<ReturnType<typeof getProfile>>

export const downloadAvatar = async (path: string): Promise<string> => {
  try {
    const { data, error } = await supabase.storage.from("avatars").download(path)
    if (error) {
      console.error("error", error)
      return ""
    }
    const fr = new FileReader()
    fr.readAsDataURL(data)
    return new Promise((resolve) => {
      fr.onload = () => {
        resolve(fr.result as string)
      }
    })
  } catch (err) {
    console.log("error", err)
    return ""
  }
}
