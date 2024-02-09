import { Text } from "app/components"
import { FlatList, View } from "react-native"
import React from "react"
import { TTracksList } from "app/models/core/TTracksList"
import { TrackCard } from "app/components/Core/TrackCard"
import { spacing } from "app/theme"

interface TracksListProps {
  category: string
  tracksList: TTracksList
}

export const TracksList = ({ category, tracksList }: TracksListProps) => {
  return (
    <View>
      <Text text={category} preset="bold" size="xl" />
      <FlatList
        data={tracksList}
        renderItem={({ item }) => <TrackCard track={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = {
  listContainer: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
}
