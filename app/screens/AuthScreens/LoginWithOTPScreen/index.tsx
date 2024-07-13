import React, { FC, useState } from "react"
import { Alert, StyleSheet } from "react-native"

import { AppStackScreenProps } from "../../../navigators"
import { supabase } from "app/lib/supabase"
import { Button, Screen, Text, TextField } from "app/components"
import { colors, spacing } from "app/theme"

interface LoginWithOTPScreenProps extends AppStackScreenProps<"LoginWithOTPScreen"> {}

export const LoginWithOTPScreen: FC<LoginWithOTPScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({ email })
    if (error) return Alert.alert(error.message)
    console.log(data)
    navigation.navigate("VerifyOTPScreen", { email })
  }
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        testID="login-heading"
        tx={"loginScreen.signIn"}
        preset="heading"
        style={styles.title}
      />
      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.input}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
      />
      <Button
        tx={"loginScreen.tapToSignIn"}
        onPress={handleSubmit}
        disabled={!email}
        style={styles.button}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: spacing.xs,
  },
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  input: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
})
