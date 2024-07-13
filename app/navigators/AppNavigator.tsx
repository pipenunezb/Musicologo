import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import * as AuthScreens from "app/screens/AuthScreens"
import * as HomeScreens from "app/screens/HomeScreens"
import * as OnboardingScreens from "app/screens/OnboardingScreens"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import { useUserInfo } from "app/lib/UserContext"

export type AppStackParamList = {
  LandingScreen: undefined
  LoginWithOTPScreen: undefined
  VerifyOTPScreen: AuthScreens.VerifyOTPScreenParams

  HomeScreen: undefined
  ProfileScreen: undefined
  LibraryScreen: undefined
  SearchScreen: undefined

  NowPlayingScreen: undefined
  PlaylistScreen: undefined
}

const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const { session } = useUserInfo()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.palette.primary500 }}
      initialRouteName={session ? "HomeScreen" : "LandingScreen"}
    >
      {session ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreens.HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={HomeScreens.ProfileScreen} />
          <Stack.Screen name="LibraryScreen" component={HomeScreens.LibraryScreen} />
          <Stack.Screen name="SearchScreen" component={HomeScreens.SearchScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="LandingScreen" component={OnboardingScreens.LandingScreen} />

          <Stack.Screen name="LoginWithOTPScreen" component={AuthScreens.LoginWithOTPScreen} />
          <Stack.Screen name="VerifyOTPScreen" component={AuthScreens.VerifyOTPScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  )
}
