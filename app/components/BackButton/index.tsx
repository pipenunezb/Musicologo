import React from "react"
import { useNavigation } from "@react-navigation/native"
import { PressableOpacity } from "../PressableOpacity"
import Icon from "react-native-vector-icons/Ionicons"
import { colors, ColorsPalette } from "app/theme"

interface BackButtonProps {
  color?: ColorsPalette
}

export const BackButton = ({ color = colors.palette.neutral100 }: BackButtonProps) => {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  return (
    <PressableOpacity onPress={goBack}>
      <Icon name="chevron-back" size={24} color={color} />
    </PressableOpacity>
  )
}
