import { TextField } from "app/components"
import { supabase } from "app/lib/supabase"
import React, { useCallback, useState } from "react"
import { View, Button } from "react-native"
// import DocumentPicker from "react-native-document-picker"

export const PostSongForm = () => {
  const [songTitle, setSongTitle] = useState("")
  const [artistName, setArtistName] = useState("")
  const [songUrl, setSongUrl] = useState("")

  // const selectSongFile = useCallback(async () => {
  //   try {
  //     const res = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.audio],
  //     })
  //     // console.log(res)
  //     return res
  //   } catch (err) {
  //     console.error("Error selecting file:", err)
  //   }
  // }, [])

  // const storeSongInSupabase = async () => {
  //   try {
  //     const songFile = await selectSongFile()
  //     console.log("songFile: ", songFile)

  //     // const response = await supabase.storage.from("songs").upload
  //   } catch (error) {
  //     console.error("Error storing song: ", error)
  //   }
  // }

  return (
    <View>
      <TextField placeholder="Song Title" onChangeText={setSongTitle} />
      <TextField placeholder="Artist Name" onChangeText={setArtistName} />
      {/* <Button title="choose song" onPress={selectSongFile} />

      <Button title="Submit" onPress={storeSongInSupabase} /> */}
    </View>
  )
}
