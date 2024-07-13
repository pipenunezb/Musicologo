import { Screen } from "app/components"
import { colors, spacing } from "app/theme"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { MyPlaylistsList } from "./components/MyPlaylistsList"
import { AppStackScreenProps } from "app/navigators"
import { DUMMY_PLAYLISTS } from "../LibraryScreen/dummyPlaylists"
import { HomeHeader } from "./components/HomeHeader"
import { AllSongs } from "./components/AllSongs"
import { DUMMY_TRACKS } from "./dummyTracks"

interface HomeScreenProps extends AppStackScreenProps<"HomeScreen"> {}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const goToProfile = () => navigation.navigate("ProfileScreen")
  const goToSearch = () => navigation.navigate("SearchScreen")
  const goToLibrary = () => navigation.navigate("LibraryScreen")
  // Get playlists
  // Get songs
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <HomeHeader onPressProfile={goToProfile} onPressSearch={goToSearch} />
      <View style={styles.body}>
        <AllSongs
          songsList={DUMMY_TRACKS}
          ListHeaderComponent={
            <MyPlaylistsList playlistsList={DUMMY_PLAYLISTS} onPressViewMore={goToLibrary} />
          }
        />
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
  container: {
    flex: 1,
  },
})
