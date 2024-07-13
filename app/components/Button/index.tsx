import React, { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native"
import { borderRadius, colors, opacity, spacing, typography } from "../../theme"
import { Text, TextProps } from "../Text"

type Presets = "filled" | "reversed" | "transparent"
type Size = "sm" | "md" | "lg"

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * Button size.
   */
  size?: Size
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   * https://reactnative.dev/docs/pressable#disabled
   */
  disabled?: boolean
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Button.md)
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    size = "lg",
    disabled,
    ...rest
  } = props

  const preset: Presets = props.preset ?? "filled"
  function $viewStyle({ pressed }: PressableStateCallbackType) {
    return [
      styles.baseView,
      $viewPresets[preset],
      $viewSizes[size],
      $viewStyleOverride,
      !!pressed && styles.pressedView,
      !!disabled && styles.disabled,
    ]
  }
  const $textStyle = [styles.baseText, $textPresets[preset], $textSizes[size], $textStyleOverride]

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
    >
      {(state) => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory style={$leftAccessoryStyle} pressableState={state} disabled={disabled} />
          )}

          <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle}>
            {children}
          </Text>

          {!!RightAccessory && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  baseText: {
    flexGrow: 0,
    flexShrink: 1,
    fontFamily: typography.primary.medium,
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
    zIndex: 2,
  },
  baseView: {
    alignItems: "center",
    borderRadius: borderRadius.md,
    flexDirection: "row",
    justifyContent: "center",
    // minHeight: 56,
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  disabled: {
    opacity: opacity.disabled,
  },
  pressedView: {
    opacity: opacity.pressed,
  },
})

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.xs, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.xs, zIndex: 1 }

const $viewSizes: Record<Size, StyleProp<ViewStyle>> = {
  sm: { paddingVertical: spacing.xxxs, paddingHorizontal: spacing.xs },
  md: { paddingVertical: spacing.xxs, paddingHorizontal: spacing.xs },
  lg: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
}

const $textSizes: Record<Size, StyleProp<TextStyle>> = {
  sm: { fontSize: 12, fontWeight: "400", lineHeight: 16 },
  md: { fontSize: 14, fontWeight: "400", lineHeight: 18 },
  lg: { fontSize: 16, fontWeight: "500", lineHeight: 20 },
}

const $viewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  filled: { backgroundColor: colors.palette.primary300 },
  reversed: { backgroundColor: colors.palette.primary400 },
  transparent: { backgroundColor: "transparent" },
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  filled: { color: colors.palette.neutral100 },
  reversed: { color: colors.palette.neutral100 },
  transparent: { color: colors.palette.primary300 },
}
