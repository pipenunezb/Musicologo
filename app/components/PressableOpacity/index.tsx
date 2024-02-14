import { opacity } from "app/theme"
import React, { type FC } from "react"
import { Pressable, type StyleProp, type PressableProps, type ViewStyle } from "react-native"

interface PressableOpacityProps extends Omit<PressableProps, "style"> {
  style?: StyleProp<ViewStyle>
}

export const PressableOpacity: FC<PressableOpacityProps> = (props) => {
  const { style, disabled, testID, ...rest } = props

  const pressableStyle = ({ pressed }: { pressed: boolean }) => {
    return [
      style,
      { opacity: pressed ? opacity.pressed : opacity.active },
      disabled && { opacity: opacity.disabled },
    ]
  }
  return (
    <Pressable
      style={pressableStyle}
      disabled={disabled}
      {...rest}
      testID={testID || "pressable-opacity"}
    />
  )
}
