import {
  Animated,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Pressable,
  Switch,
} from "react-native"
import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { Text, TextProps } from "../Text"
import { borderRadius, colors, spacing } from "app/theme"

interface ToggleBaseProps {
  label?: string
  labelTx?: TextProps["tx"]
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  initialValue?: boolean
  onChange?: (checked: boolean) => void
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
}

interface ToggleProps extends ToggleBaseProps {
  variant: "checkbox" | "switch" | "radio"
}

const sizes = {
  sm: 20,
  md: 24,
  lg: 28,
}

export const Toggle = (props: ToggleProps) => {
  const {
    variant = "checkbox",
    initialValue = false,
    onChange,
    disabled = false,
    label,
    labelTx,
    size = "lg",
    containerStyle,
    labelStyle,
  } = props
  const [checked, setChecked] = useState(initialValue)
  const fadeAnimation = new Animated.Value(initialValue ? 1 : 0)

  const handleToggle = () => {
    if (disabled) return
    setChecked(!checked)
    onChange?.(!checked)
  }

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [checked])

  if (variant === "checkbox") {
    return (
      <View style={[styles.container, containerStyle]}>
        <Pressable
          style={[styles.checkboxContainer, checked ? styles.onStyle : styles.offStyle]}
          onPress={handleToggle}
        >
          <Animated.View style={{ opacity: fadeAnimation }}>
            <Icon
              name="checkmark"
              size={sizes[size]}
              color={disabled ? colors.palette.neutral500 : colors.palette.primary400}
            />
          </Animated.View>
        </Pressable>

        <Text text={label} tx={labelTx} style={labelStyle} />
      </View>
    )
  }

  if (variant === "radio") {
    return (
      <View style={[styles.container, containerStyle]}>
        <Pressable
          style={[
            styles.radioContainer,
            styles.offStyle,
            { width: sizes[size], height: sizes[size] },
          ]}
          onPress={handleToggle}
        >
          <Animated.View style={[styles.radio, { opacity: fadeAnimation }]} />
        </Pressable>

        <Text text={label} tx={labelTx} style={labelStyle} />
      </View>
    )
  }

  if (variant === "switch") {
    return (
      <View style={[styles.container, containerStyle]}>
        <Switch
          value={checked}
          onChange={handleToggle}
          thumbColor={colors.palette.primary200}
          trackColor={{ true: colors.palette.primary300, false: colors.palette.primary400 }}
          ios_backgroundColor={colors.palette.primary400}
          style={{ transform: [{ scaleX: sizes[size] / 30 }, { scaleY: sizes[size] / 30 }] }}
        />
        <Text text={label} tx={labelTx} style={labelStyle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    borderRadius: borderRadius.xs,
    borderWidth: 2,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  offStyle: {
    backgroundColor: colors.transparent,
    borderColor: colors.palette.primary300,
  },
  onStyle: {
    backgroundColor: colors.palette.primary300,
    borderColor: colors.palette.primary300,
  },
  radio: {
    backgroundColor: colors.palette.primary300,
    borderRadius: 50,
    height: "70%",
    width: "70%",
  },
  radioContainer: {
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
  },
})
