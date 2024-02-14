import { Screen, Text } from "app/components"
import { HomeTabScreenProps } from "app/navigators/HomeTabNavigator"
import { colors, spacing } from "app/theme"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { TracksList } from "./components/TracksList"
import { SvgIcon } from "app/components/SvgIcon"
import { DUMMY_TRACKS } from "./dummyTracks"

interface HomeScreenProps extends HomeTabScreenProps<"HomeScreen"> {}

export const HomeScreen: FC<HomeScreenProps> = () => {
  return (
    <Screen
      preset="auto"
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.body}>
        <View style={styles.row}>
          <SvgIcon name="Musicologo" size={40} />
          <Text style={styles.text} tx="common.appName" preset="subheading" />
        </View>

        <TracksList category="Popular" tracksList={DUMMY_TRACKS} />
        <TracksList category="Recently Played" tracksList={DUMMY_TRACKS} />
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
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  text: {
    color: colors.palette.neutral100,
  },
})
