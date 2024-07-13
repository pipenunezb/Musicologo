import React from "react"
import { ListItem, Text } from "app/components"
import { TTrack } from "app/models/core"
import { formatArtists } from "app/utils/formatArtists"
import { FlatList, View } from "react-native"
import { spacing } from "app/theme"

interface AllSongsProps {
  songsList: TTrack[]
  ListHeaderComponent?: React.ReactNode
}

export const AllSongs = ({ songsList, ListHeaderComponent }: AllSongsProps) => {
  return (
    <View>
      <FlatList
        data={songsList}
        renderItem={({ item }) => (
          <ListItem
            imageUri={item.imageUri}
            title={item.title}
            subtitle={formatArtists(item.artists)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {ListHeaderComponent}
            <Text text="All Songs" preset="bold" size="xl" />
          </>
        }
      />
    </View>
  )
}

const styles = {
  listContainer: {
    gap: spacing.sm,
  },
}
