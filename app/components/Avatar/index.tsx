import { StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import React from "react"
import { AutoImage } from "../AutoImage"
import { colors } from "app/theme"

interface AvatarProps {
  imageUri?: string
  size?: number
}

export const Avatar = ({ imageUri, size = 40 }: AvatarProps) => {
  const sizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }
  return (
    <View style={[styles.container, sizeStyle]}>
      {imageUri ? (
        <AutoImage source={{ uri: imageUri }} maxHeight={size} maxWidth={size} style={sizeStyle} />
      ) : (
        <Icon name="person" size={size} color={colors.palette.primary300} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.primary400,
    overflow: "hidden",
  },
})
