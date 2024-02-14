import { AutoImage, Text } from "app/components"
import { PressableOpacity } from "app/components/PressableOpacity"
import { StyleSheet, View } from "react-native"
import React from "react"
import { PlayingControls } from "../PlayingControls"
import { borderRadius, colors, spacing } from "app/theme"

export const NowPlaying = () => {
  return (
    <PressableOpacity style={styles.container}>
      <View style={styles.infoContainer}>
        <AutoImage source={{ uri: "https://picsum.photos/id/31/200" }} style={styles.image} />
        <View style={styles.trackInfo}>
          <Text numberOfLines={1} size="sm" weight="semiBold">
            Track 1
          </Text>
          <Text style={styles.subtitle} numberOfLines={1} size="xs">
            Artist 1, Artist 2, Artist 3, Artist 4, Artist 5
          </Text>
        </View>
        <PlayingControls size="small" />
      </View>
      <View style={styles.progressContainer}>
        <View style={[styles.progress, { width: `${20}%` }]} />
      </View>
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.primary400,
  },
  image: {
    borderRadius: borderRadius.xs,
    height: 50,
    width: 50,
  },
  infoContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "space-between",
    padding: spacing.sm,
  },
  progress: {
    backgroundColor: colors.palette.primary300,
    height: 2,
  },
  progressContainer: {
    backgroundColor: colors.palette.primary200,
    height: 2,
    width: "100%",
  },
  subtitle: {
    color: colors.palette.primary200,
  },
  trackInfo: {
    flex: 1,
  },
})
