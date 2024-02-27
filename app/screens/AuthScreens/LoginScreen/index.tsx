import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, StyleSheet } from "react-native"

import { AppStackScreenProps } from "../../../navigators"
import { supabase } from "app/lib/supabase"
import { SignInWithPasswordCredentials } from "@supabase/supabase-js"
import { AuthForm } from "../components/AuthForm"
import { Button, Screen } from "app/components"
import { colors, spacing } from "app/theme"

interface LoginScreenProps extends AppStackScreenProps<"LoginScreen"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {
  const goToRegister = () => navigation.replace("RegisterScreen")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (credentials: SignInWithPasswordCredentials) => {
    if (!("email" in credentials)) return
    setLoading(true)
    const { email, password } = credentials
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) Alert.alert(error.message)

    console.log(data)
    setLoading(false)
  }
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <AuthForm mode="login" loading={loading} onLogin={handleLogin} />
      <Button
        preset="transparent"
        tx="loginScreen.goToRegister"
        onPress={goToRegister}
        style={styles.registerButton}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  registerButton: {
    marginTop: spacing.md,
  },
})
