import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import * as ProfileScreens from "app/screens/HomeScreens/ProfileScreens"
import Config from "../config"
import { useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"

export type ProfileStackParamList = {
  ProfileScreen: undefined
  PostNewSongScreen: undefined
  BecomeAnArtistScreen: undefined
}

const exitRoutes = Config.exitRoutes

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> = NativeStackScreenProps<
  ProfileStackParamList,
  T
>

const Stack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileStack = observer(function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.palette.primary500 }}
      initialRouteName={"ProfileScreen"}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreens.ProfileScreen} />
      <Stack.Screen name="PostNewSongScreen" component={ProfileScreens.PostNewSongScreen} />
      <Stack.Screen name="BecomeAnArtistScreen" component={ProfileScreens.BecomeAnArtistScreen} />
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const ProfileNavigator = observer(function ProfileNavigator() {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return <ProfileStack />
})
