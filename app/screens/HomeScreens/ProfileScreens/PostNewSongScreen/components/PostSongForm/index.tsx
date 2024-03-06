import { Button, Text, TextField } from "app/components"
import { supabase } from "app/lib/supabase"
import { spacing } from "app/theme"
import React, { useCallback, useState } from "react"
import { View, StyleSheet } from "react-native"
import DocumentPicker from "react-native-document-picker"

interface PostSongFormProps {
  onSuccessfulPost?: () => void
}

export const PostSongForm = ({ onSuccessfulPost }: PostSongFormProps) => {
  const [songTitle, setSongTitle] = useState("")
  const [songUri, setSongUri] = useState("")
  const [songName, setSongName] = useState("")
  const [isPostingSong, setIsPostingSong] = useState(false)

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
      const songFileExt = songUri.split(".").pop()
      // eslint-disable-next-line no-useless-escape
      const songFileName = songUri.replace(/^.*[\\\/]/, "")
      const songFilePath = `${Date.now()}.${songFileExt}`

      const formData = new FormData()
      const song = {
        uri: songUri,
        name: songFileName,
        type: `audio/${songFileExt}`,
      } as unknown as Blob
      formData.append("file", song)

      const { error } = await supabase.storage.from("songs").upload(songFilePath, formData)
      if (error) throw error

      return songFilePath
    } catch (error) {
      console.error("Error storing new song: ", error)
    }
  }

  const postNewSong = async () => {
    try {
      setIsPostingSong(true)
      const songFilePath = await storeSongInSupabase()
      const { error } = await supabase.from("AllTracks").insert({
        song_name: songTitle,
        song_url: songFilePath,
      })

      if (error) throw error

      onSuccessfulPost?.()
    } catch (error) {
      console.error("Error posting new song: ", error)
    } finally {
      setIsPostingSong(false)
    }
  }

  const isSubmitDisabled = !songTitle || !songUri || isPostingSong

  return (
    <View style={styles.container}>
      <TextField placeholder="Song Title" onChangeText={setSongTitle} />
      {songName ? (
        <Text text={songName} style={styles.songName} />
      ) : (
        <Button preset="transparent" text="choose song" onPress={selectSongFile} />
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
