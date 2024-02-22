import { Button, Text, TextField } from "app/components"
import { supabase } from "app/lib/supabase"
import { spacing } from "app/theme"
import React, { useCallback, useState } from "react"
import { View, StyleSheet } from "react-native"
import DocumentPicker from "react-native-document-picker"

export const PostSongForm = () => {
  const [songTitle, setSongTitle] = useState("")
  const [artistName, setArtistName] = useState("")
  const [songUri, setSongUri] = useState("")
  const [songName, setSongName] = useState("")

  const selectSongFile = useCallback(async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
      })
      setSongUri(res.uri)
      setSongName(res.name || "song.mp3")
    } catch (err) {
      console.error("Error selecting file:", err)
    }
  }, [])

  const storeSongInSupabase = async () => {
    try {
      const copySongUri = songUri

      const songFileExt = copySongUri.split(".").pop()
      // eslint-disable-next-line no-useless-escape
      const songFileName = copySongUri.replace(/^.*[\\\/]/, "")
      const songFilePath = `${Date.now()}.${songFileExt}`

      const formData = new FormData()
      const song = {
        uri: copySongUri,
        name: songFileName,
        type: `audio/${songFileExt}`,
      } as unknown as Blob
      formData.append("file", song)

      await supabase.storage.from("songs").upload(songFilePath, formData)

      return songFilePath
    } catch (error) {
      return console.error("Error storing song: ", error)
    }
  }

  const postNewSong = async () => {
    try {
      const songFilePath = await storeSongInSupabase()
      await supabase.from("songs").insert([
        {
          title: songTitle,
          artist: artistName,
          song_file: songFilePath,
        },
      ])
    } catch (error) {
      console.error("Error posting new song: ", error)
    }
  }

  const isSubmitDisabled = !songTitle || !artistName || !songUri

  return (
    <View style={styles.container}>
      <TextField placeholder="Song Title" onChangeText={setSongTitle} />
      <TextField placeholder="Artist Name" onChangeText={setArtistName} />
      {songName ? (
        <Text text={songName} style={styles.songName} />
      ) : (
        <Button preset="reversed" text="choose song" onPress={selectSongFile} />
      )}

      <Button disabled={isSubmitDisabled} text="Submit" onPress={postNewSong} />
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
  songName: {
    textAlign: "center",
  },
})
