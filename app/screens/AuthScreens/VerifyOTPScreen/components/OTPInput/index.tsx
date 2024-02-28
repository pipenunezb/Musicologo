import { Text } from "app/components"
import { borderRadius, colors } from "app/theme"
import React, { useRef, useState } from "react"
import { View, TextInput, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native"

interface OTPInputProps {
  onChange: (otp: string) => void
  style?: StyleProp<ViewStyle>
}

export const OTPInput = ({ onChange, style }: OTPInputProps) => {
  const inputRef = useRef<TextInput>(null)
  const [otp, setOtp] = useState("")
  const destructuredOtp = otp.split("")

  const handleChangeText = (text: string) => {
    setOtp(text)
    onChange(text)
  }

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      <Pressable style={[styles.fieldsContainer, style]} onPress={handleFocus}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} style={styles.singleField}>
            <Text preset="subheading" text={destructuredOtp[index] || "•"} />
          </View>
        ))}
      </Pressable>

      <TextInput
        onChangeText={handleChangeText}
        value={otp}
        ref={inputRef}
        maxLength={6}
        style={styles.input}
        pointerEvents="none"
        keyboardType="number-pad"
        autoCorrect={false}
      />
    </>
  )
}

const styles = StyleSheet.create({
  fieldsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    height: 0,
    opacity: 0,
    width: 0,
  },
  singleField: {
    alignItems: "center",
    backgroundColor: colors.palette.primary400,
    borderRadius: borderRadius.sm,
    height: 48,
    justifyContent: "center",
    width: 40,
  },
})
