import {
  BottomTabBar,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import * as HomeScreens from "app/screens/HomeScreens"
import Icon from "react-native-vector-icons/Ionicons"
import { Text } from "app/components"
import { NowPlaying } from "app/components/Core/NowPlaying"

export type HomeTabParamList = {
  HomeScreen: undefined
  LibraryScreen: undefined
  ProfileScreen: undefined
  SearchScreen: undefined
}

export type HomeTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<HomeTabParamList>()

export function HomeNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View style={$tabBar}>
          <NowPlaying />
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreens.HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              tx="HomeScreens.HomeScreen.name"
              size="xs"
              style={{ color: focused ? colors.palette.neutral100 : colors.palette.primary200 }}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              color={focused ? colors.palette.neutral100 : colors.palette.primary200}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={HomeScreens.SearchScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              tx="HomeScreens.SearchScreen.name"
              size="xs"
              style={{ color: focused ? colors.palette.neutral100 : colors.palette.primary200 }}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              name="search"
              color={focused ? colors.palette.neutral100 : colors.palette.primary200}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LibraryScreen"
        component={HomeScreens.LibraryScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              tx="HomeScreens.LibraryScreen.name"
              size="xs"
              style={{ color: focused ? colors.palette.neutral100 : colors.palette.primary200 }}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              name="albums"
              color={focused ? colors.palette.neutral100 : colors.palette.primary200}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={HomeScreens.ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              tx="HomeScreens.ProfileScreen.name"
              size="xs"
              style={{ color: focused ? colors.palette.neutral100 : colors.palette.primary200 }}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              name="person"
              color={focused ? colors.palette.neutral100 : colors.palette.primary200}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.primary500,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
