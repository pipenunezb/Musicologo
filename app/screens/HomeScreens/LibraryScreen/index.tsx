import { Header, ListItem, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { DUMMY_PLAYLISTS } from "./dummyPlaylists"
import { AppStackScreenProps } from "app/navigators"

interface LibraryScreenProps extends AppStackScreenProps<"LibraryScreen"> {}

export const LibraryScreen: FC<LibraryScreenProps> = () => {
  return (
    <Screen
      preset="scroll"
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <Header hasBackButton title="My Playlists" />
      <View style={styles.body}>
        {DUMMY_PLAYLISTS.map((playlist) => (
          <ListItem
            key={playlist.id}
            title={playlist.title}
            subtitle={`${playlist.numberOfSongs} songs`}
            imageUri={playlist.imageUri}
          />
        ))}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
})
