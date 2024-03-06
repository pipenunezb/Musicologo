import { Session } from "@supabase/supabase-js"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { supabase } from "./supabase"
import { getProfile, UserProfile } from "./api"

// definir context para guardar el session y el profile

export interface UserInfo {
  session: Session | null
  profile: UserProfile | null
}

const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
})

// crear un provider donde vamos a tener la logica para escuchar cambios de la session
export function AuthProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    session: null,
    profile: null,
  })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserInfo({ ...userInfo, session })
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUserInfo({ session, profile: null })
    })
  }, [])

  const fetchProfile = async () => {
    if (userInfo.session) {
      getProfile(userInfo.session).then((profile) => {
        setUserInfo({ ...userInfo, profile })
      })
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [userInfo.session, userInfo.profile])

  return <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
}

// crear un hook reutilizable que utilice el context
export function useUserInfo() {
  return useContext(UserContext)
}
