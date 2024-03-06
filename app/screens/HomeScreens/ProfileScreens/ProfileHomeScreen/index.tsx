import { Button, Screen, Text } from "app/components"
import { useUserInfo } from "app/lib/UserContext"
import { supabase } from "app/lib/supabase"
import { ProfileStackScreenProps } from "app/navigators/ProfileNavigator"
import { colors, spacing } from "app/theme"
import React, { FC, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Entypo"
import { AvatarSelect } from "./AvatarSelect"
import { downloadAvatar } from "app/lib/api"

interface ProfileScreenProps extends ProfileStackScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const [avatarUrl, setAvatarUrl] = useState("")
  const logout = () => {
    supabase.auth.signOut()
  }

  const handleAddNewSong = () => {
    navigation.navigate("PostNewSongScreen")
  }

  const { profile } = useUserInfo()
  const isArtist = profile?.is_artist

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadAvatar(profile.avatar_url).then((url) => {
        setAvatarUrl(url)
      })
    }
  }, [])

  const handleBecomeAnArtist = () => {
    navigation.navigate("BecomeAnArtistScreen")
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.body}>
        <AvatarSelect imageUri={avatarUrl} />
        {isArtist ? (
          <>
            <View style={styles.nameContainer}>
              <View style={styles.emptyView} />
              <Text text={profile?.username ?? ""} preset="subheading" />
              <Icon name="modern-mic" size={24} color={colors.palette.primary300} />
            </View>
            <Button preset="filled" onPress={handleAddNewSong} text="Add new song" />
          </>
        ) : (
          <Button preset="transparent" onPress={handleBecomeAnArtist} text="Become an artist" />
        )}
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
})
