import { Header, Screen } from "app/components"
import { ProfileStackScreenProps } from "app/navigators/ProfileNavigator"
import { colors, spacing } from "app/theme"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { PostSongForm } from "./components/PostSongForm"

interface PostNewSongScreenProps extends ProfileStackScreenProps<"PostNewSongScreen"> {}

export const PostNewSongScreen: FC<PostNewSongScreenProps> = () => {
  return (
    <Screen
      preset="auto"
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.container}>
        <Header title="Post New Song" hasBackButton style={styles.header} />
        <PostSongForm />
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
