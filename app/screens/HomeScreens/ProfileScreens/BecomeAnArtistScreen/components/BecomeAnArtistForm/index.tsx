import { useNavigation } from "@react-navigation/native"
import { Button, TextField } from "app/components"
import { useUserInfo } from "app/lib/UserContext"
import { supabase } from "app/lib/supabase"
import { spacing } from "app/theme"
import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

export const BecomeAnArtistForm = () => {
  const [artistName, setArtistName] = useState("")
  const { profile } = useUserInfo()

  const navigator = useNavigation()

  const handleBecomeAnArtist = async () => {
    if (!profile) return

    const { error } = await supabase
      .from("profiles")
      .update({ is_artist: true, username: artistName })
      .eq("id", profile?.id)
    if (error) {
      console.error("Error updating profile:", error)
    }

    navigator.goBack()
  }

  const isSubmitDisabled = !artistName

  return (
    <View style={styles.container}>
      <TextField placeholder="My Artist Name" onChangeText={setArtistName} />
      <Button disabled={isSubmitDisabled} text="Submit" onPress={handleBecomeAnArtist} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md,
    justifyContent: "center",
    padding: spacing.md,
    width: "100%",
  },
})
