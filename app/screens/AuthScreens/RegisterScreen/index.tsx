import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Alert, StyleSheet } from "react-native"

import { AppStackScreenProps } from "../../../navigators"
import { supabase } from "app/lib/supabase"
import { AuthForm } from "../components/AuthForm"
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js"
import { Button, Screen } from "app/components"
import { colors, spacing } from "app/theme"

interface RegisterScreenProps extends AppStackScreenProps<"RegisterScreen"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen({
  navigation,
}) {
  const goToLogin = () => navigation.replace("LoginScreen")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (credentials: SignUpWithPasswordCredentials) => {
    if (!("email" in credentials)) return
    setLoading(true)
    const { email, password, options } = credentials
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options,
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
      <AuthForm mode="signUp" loading={loading} onSignUp={handleSignup} />
      <Button
        preset="transparent"
        tx="registerScreen.goToLogin"
        onPress={goToLogin}
        style={styles.loginButton}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  loginButton: {
    marginTop: spacing.md,
  },
})
