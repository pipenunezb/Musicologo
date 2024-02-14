import { TTrack } from "app/models/core/TTrack"
import { StyleSheet, View } from "react-native"
import React from "react"
import { AutoImage, Text } from "app/components"
import { borderRadius, colors } from "app/theme"

interface TrackCardProps {
  track: TTrack
}
export const TrackCard = ({ track }: TrackCardProps) => {
  const artistsText = Array.isArray(track.artists) ? track.artists.join(", ") : track.artists
  return (
    <View style={styles.container}>
      <AutoImage source={{ uri: track.imageUri }} style={styles.image} />
      <Text style={styles.title} text={track.title} />
      <Text size="xs" style={styles.artists} text={artistsText} numberOfLines={2} />
    </View>
  )
}

const styles = StyleSheet.create({
  artists: {
    color: colors.palette.primary200,
  },
  container: {
    width: 100,
  },
  image: {
    borderRadius: borderRadius.sm,
    height: 100,
    width: 100,
  },
  title: {
    fontWeight: "500",
  },
})
