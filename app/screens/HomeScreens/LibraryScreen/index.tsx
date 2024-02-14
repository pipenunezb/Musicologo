import { Screen, Text } from "app/components"
import { HomeTabScreenProps } from "app/navigators/HomeTabNavigator"
import { colors, spacing } from "app/theme"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { DUMMY_PLAYLISTS } from "./dummyPlaylists"
import { PlaylistCard } from "app/components/Core/PlaylistCard"

interface LibraryScreenProps extends HomeTabScreenProps<"LibraryScreen"> {}

export const LibraryScreen: FC<LibraryScreenProps> = () => {
  return (
    <Screen
      preset="scroll"
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.body}>
        <Text tx="HomeScreens.LibraryScreen.title" preset="subheading" />
        {DUMMY_PLAYLISTS.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            title={playlist.title}
            numberOfSongs={playlist.numberOfSongs}
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
    gap: spacing.md,
    padding: spacing.md,
  },
})
