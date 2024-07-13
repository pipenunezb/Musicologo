import { Button, ListItem, Text } from "app/components"
import { FlatList, StyleSheet, View } from "react-native"
import React from "react"
import { TPlaylist } from "app/models/core"
import { spacing } from "app/theme"

interface MyPlaylistsListProps {
  playlistsList: TPlaylist[]
  onPressViewMore: () => void
}

export const MyPlaylistsList = ({ playlistsList, onPressViewMore }: MyPlaylistsListProps) => {
  return (
    <View>
      <View style={styles.header}>
        <Text text="My Playlists" preset="bold" size="xl" />
        <Button size="md" text="View all" onPress={onPressViewMore} preset="reversed" />
      </View>

      <FlatList
        data={playlistsList}
        renderItem={({ item }) => (
          <ListItem
            imageUri={item.imageUri}
            title={item.title}
            subtitle={`${item.numberOfSongs} songs`}
            displayHorizontally
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listContainer: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
})
