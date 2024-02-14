declare module "*.png" {
  const value: import("react-native").ImageSourcePropType
  export default value
}
declare module "*.jpg" {
  const value: import("react-native").ImageSourcePropType
  export default value
}

declare module "*.svg" {
  import type React from "react"
  import { type SvgProps } from "react-native-svg"
  const content: React.FC<SvgProps>
  export default content
}

declare module "react-native-vector-icons/MaterialCommunityIcons"
declare module "react-native-vector-icons/Ionicons"
declare module "react-native-vector-icons/Entypo"
