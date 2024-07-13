import { Header, Screen } from "app/components"
import { ProfileStackScreenProps } from "app/navigators/ProfileNavigator"
import { colors, spacing } from "app/theme"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { BecomeAnArtistForm } from "./components/BecomeAnArtistForm"

interface BecomeAnArtistScreenProps extends ProfileStackScreenProps<"BecomeAnArtistScreen"> {}

export const BecomeAnArtistScreen: FC<BecomeAnArtistScreenProps> = () => {
  return (
    <Screen
      preset="auto"
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.container}>
        <Header title="Become An Artist" hasBackButton style={styles.header} />
        <BecomeAnArtistForm />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.md,
  },
})
