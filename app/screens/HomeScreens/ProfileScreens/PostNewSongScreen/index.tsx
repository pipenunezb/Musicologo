import { Button, Screen, Text } from "app/components"
import { ProfileStackScreenProps } from "app/navigators/ProfileNavigator"
import { colors, spacing } from "app/theme"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Entypo"
import { PostSongForm } from "./components/PostSongForm"

interface PostNewSongScreenProps extends ProfileStackScreenProps<"PostNewSongScreen"> {}

export const PostNewSongScreen: FC<PostNewSongScreenProps> = ({ navigation }) => {
  return (
    <Screen
      preset="auto"
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.container}>
        <Text text="PostNewSongScreen" />
        <PostSongForm />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
