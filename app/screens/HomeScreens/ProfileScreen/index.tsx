import { Button, Header, Screen, Text } from "app/components"
import { useUserInfo } from "app/lib/UserContext"
import { supabase } from "app/lib/supabase"
import { colors, spacing } from "app/theme"
import React, { FC, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { AvatarSelect } from "./AvatarSelect"
import { downloadAvatar } from "app/lib/api"
import { AppStackScreenProps } from "app/navigators"

interface ProfileScreenProps extends AppStackScreenProps<"ProfileScreen"> {}

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const [avatarUrl, setAvatarUrl] = useState("")
  const logout = () => {
    supabase.auth.signOut()
  }

  const { profile } = useUserInfo()
  // const isArtist = profile?.is_artist

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadAvatar(profile.avatar_url).then((url) => {
        setAvatarUrl(url)
      })
    }
  }, [])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <Header hasBackButton title="Profile" />
      <View style={styles.body}>
        <AvatarSelect imageUri={avatarUrl} />
        <>
          <View style={styles.infoContainer}>
            <Text text={profile?.username ?? "user name"} preset="subheading" />
            <Text text={"user@email.com"} preset="subheading" />
          </View>
        </>
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
  footer: {
    bottom: 0,
    padding: spacing.md,
    position: "absolute",
    width: "100%",
  },
  infoContainer: {
    alignItems: "center",
    gap: spacing.sm,
  },
})
