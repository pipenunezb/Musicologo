import { StyleSheet, View } from "react-native"
import React from "react"
import { AutoImage, PressableOpacity, Text } from "app/components"
import { borderRadius, colors, spacing } from "app/theme"

interface ListItemProps {
  title: string
  subtitle?: string
  imageUri: string
  displayHorizontally?: boolean
  onPress?: () => void
}

export const ListItem = ({
  title,
  subtitle,
  imageUri,
  displayHorizontally = false,
  onPress,
}: ListItemProps) => {
  return (
    <PressableOpacity
      onPress={onPress}
      style={[styles.container, displayHorizontally && styles.containerHorizontallyStyle]}
    >
      <AutoImage
        source={{ uri: imageUri }}
        style={[styles.image, displayHorizontally && styles.imageHorizontallyStyle]}
      />
      <View style={styles.infoContainer}>
        <Text text={title} />
        <Text size="xs" style={styles.subtitle} text={subtitle} />
      </View>
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  containerHorizontallyStyle: {
    alignSelf: "flex-start",
    flexDirection: "column",
  },
  image: {
    borderRadius: borderRadius.sm,
    height: 60,
    width: 60,
  },
  imageHorizontallyStyle: {
    borderRadius: borderRadius.sm,
    height: 100,
    width: 100,
  },
  infoContainer: {
    gap: spacing.xxs,
  },
  subtitle: {
    color: colors.palette.primary200,
  },
})
