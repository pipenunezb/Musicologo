import { PressableOpacity } from "app/components/PressableOpacity"
import { colors, spacing } from "app/theme"
import { StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import React from "react"

interface PlayingControlsProps {
  onBack?: () => void
  onForward?: () => void
  onPlayPause?: () => void
  isPlaying?: boolean
  size?: "small" | "large"
}

export const PlayingControls = ({
  onBack,
  onForward,
  onPlayPause,
  isPlaying,
  size,
}: PlayingControlsProps) => {
  if (size === "small") {
    return (
      <PressableOpacity onPress={onPlayPause}>
        <Icon name={isPlaying ? "pause-circle" : "play-circle"} size={40} color={colors.text} />
      </PressableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <PressableOpacity onPress={onBack}>
        <Icon name="play-skip-back" size={30} color={colors.text} />
      </PressableOpacity>
      <PressableOpacity onPress={onPlayPause}>
        <Icon name={isPlaying ? "pause-circle" : "play-circle"} size={50} color={colors.text} />
      </PressableOpacity>
      <PressableOpacity onPress={onForward}>
        <Icon name="play-skip-forward" size={30} color={colors.text} />
      </PressableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: spacing.sm,
  },
})
