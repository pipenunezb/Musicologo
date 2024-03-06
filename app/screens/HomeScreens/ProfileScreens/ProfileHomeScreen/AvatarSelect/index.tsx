import { PressableOpacity } from "app/components"
import { Avatar } from "app/components/Avatar"
import { useUserInfo } from "app/lib/UserContext"
import { supabase } from "app/lib/supabase"
import React, { useCallback, useState } from "react"
import { Options, openPicker } from "react-native-image-crop-picker"

interface AvatarSelectProps {
  imageUri?: string
}

export const AvatarSelect = ({ imageUri }: AvatarSelectProps) => {
  const [avatarUrl, setAvatarUrl] = useState("")
  const { profile } = useUserInfo()

  const selectImage = useCallback(async () => {
    const commonOptions: Options = {
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: "photo",
    }

    if (!profile) return

    try {
      const selection = await openPicker(commonOptions)
      if (!selection) return
      const imageUrl = selection.path

      const fileExt = imageUrl.split(".").pop()
      // eslint-disable-next-line no-useless-escape
      const fileName = imageUrl.replace(/^.*[\\\/]/, "")
      const filePath = `${Date.now()}.${fileExt}`

      const formData = new FormData()
      const photo = {
        uri: imageUrl,
        name: fileName,
        type: `image/${fileExt}`,
      } as unknown as Blob
      formData.append("file", photo)

      const { error: storageError, data: uploadedImage } = await supabase.storage
        .from("avatars")
        .upload(filePath, formData)
      if (storageError) throw storageError

      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: uploadedImage.path })
        .eq("id", profile.id)

      if (error) {
        throw error
      }

      setAvatarUrl(imageUrl)
    } catch (err) {
      console.error("Error selecting file:", err)
    }
  }, [])

  return (
    <PressableOpacity onPress={selectImage}>
      <Avatar imageUri={avatarUrl || imageUri} size={150} />
    </PressableOpacity>
  )
}
