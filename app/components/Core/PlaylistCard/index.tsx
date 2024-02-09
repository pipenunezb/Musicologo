import { Image, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "app/components/Text"
import { colors, spacing } from "app/theme"

interface PlaylistCardProps {
  title: string
  numberOfSongs: number
  imageUri: string
}

export const PlaylistCard = ({ title, numberOfSongs, imageUri }: PlaylistCardProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} resizeMode="contain" style={styles.image} />
      <View style={styles.infoContainer}>
        <Text text={title} />
        <Text size="xs" style={styles.subtitle} text={`${numberOfSongs} songs`} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  image: {
    borderRadius: spacing.sm,
    height: 60,
    width: 60,
  },
  infoContainer: {
    gap: spacing.xxs,
  },
  subtitle: {
    color: colors.palette.primary200,
  },
})
