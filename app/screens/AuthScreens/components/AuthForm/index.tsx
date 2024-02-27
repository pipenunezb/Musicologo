import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js"
import { Button, Icon, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { colors, spacing } from "app/theme"
import React, { ComponentType, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle } from "react-native"

interface AuthFormProps {
  onSignUp?: (credentials: SignUpWithPasswordCredentials) => void
  onLogin?: (credentials: SignInWithPasswordCredentials) => void
  loading: boolean
  mode: "login" | "signUp"
}

export const AuthForm = ({ onSignUp, onLogin, loading, mode }: AuthFormProps) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    if (mode === "login") {
      onLogin?.({ email, password })
    } else {
      onSignUp?.({ email, password, options: { data: { username } } })
    }
  }

  const authPasswordInput = useRef<TextInput>(null)

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.primary200}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const shouldDisableButton = loading || !email || !password || (mode === "signUp" && !username)

  return (
    <View>
      <Text
        testID="login-heading"
        tx={mode === "login" ? "loginScreen.signIn" : "registerScreen.signUp"}
        preset="heading"
        style={$signIn}
      />

      {mode === "signUp" && (
        <TextField
          value={username}
          onChangeText={setUsername}
          containerStyle={$textField}
          autoCapitalize="none"
          autoCorrect={false}
          labelTx="registerScreen.usernameFieldLabel"
          placeholderTx="registerScreen.usernameFieldPlaceholder"
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />
      )}

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={password}
        onChangeText={setPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={handleSubmit}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        tx={mode === "login" ? "loginScreen.tapToSignIn" : "loginScreen.tapToSignIn"}
        onPress={handleSubmit}
        disabled={shouldDisableButton}
        style={$tapButton}
      />
    </View>
  )
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}
