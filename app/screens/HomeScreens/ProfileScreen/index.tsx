import { AutoImage, Button, Screen, Text } from "app/components"
import { useStores } from "app/models"
import { HomeTabScreenProps } from "app/navigators/HomeTabNavigator"
import { colors, spacing } from "app/theme"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface ProfileScreenProps extends HomeTabScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const {
    authenticationStore: { logout },
  } = useStores()

  const isArtist = true

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.body}>
        <AutoImage
          source={{ uri: "https://picsum.photos/id/30/200" }}
          style={styles.profilePicture}
        />
        <View style={styles.nameContainer}>
          {isArtist && <View style={styles.emptyView} />}
          <Text text="Jane Doe" preset="subheading" />
          {isArtist && <Icon name="verified" size={24} color={colors.palette.primary300} />}
        </View>
        <Text style={styles.followersText} text="120 followers" />
        <View style={styles.footer}>
          <Button preset="filled" onPress={logout} tx="common.logOut" />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
    gap: spacing.md,
  },
  container: {
    flex: 1,
  },
  emptyView: {
    width: 24,
  },
  followersText: {
    color: colors.palette.primary300,
  },
  footer: {
    bottom: 0,
    padding: spacing.md,
    position: "absolute",
    width: "100%",
  },
  nameContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  profilePicture: {
    borderRadius: 100,
    height: 200,
    width: 200,
  },
})
