import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { StyleSheet } from "react-native"

import { AppStackScreenProps } from "../../../navigators"
import { supabase } from "app/lib/supabase"
import { Header, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { OTPInput } from "./components/OTPInput/index"

interface VerifyOTPScreenProps extends AppStackScreenProps<"VerifyOTPScreen"> {}

export type VerifyOTPScreenParams = {
  email: string
}

export const VerifyOTPScreen: FC<VerifyOTPScreenProps> = observer(function VerifyOTPScreen({
  route,
}) {
  const { email } = route.params ?? {}
  const [token, setToken] = useState("")
  const [error, setError] = useState("")

  const verifyOTP = async () => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    })
    if (error) return setError(error.message)
  }

  useEffect(() => {
    token.length === 6 && verifyOTP()
  }, [token])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <Header hasBackButton />
      <Text preset="subheading" text={`Enter the code we just sent you to: ${email}`} />
      <OTPInput onChange={setToken} style={styles.input} />
      <Text style={styles.errorText} text={error} />
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    color: colors.palette.angry100,
    marginTop: spacing.sm,
  },
  input: {
    marginTop: spacing.lg,
  },
})
