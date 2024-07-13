import { Screen, Text, TextField } from "app/components"
import { BackButton } from "app/components/BackButton"
import { HomeTabScreenProps } from "app/navigators/HomeTabNavigator"
import { colors, spacing } from "app/theme"
import React, { FC, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface SearchScreenProps extends HomeTabScreenProps<"SearchScreen"> {}

export const SearchScreen: FC<SearchScreenProps> = () => {
  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText) {
        console.log("Searching for:", searchText)
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [searchText])
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.primary600}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.header}>
        <BackButton color={colors.palette.primary200} />
        <TextField
          value={searchText}
          onChangeText={setSearchText}
          containerStyle={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTx="HomeScreens.SearchScreen.searchPlaceholder"
          RightAccessory={() => (
            <Icon style={styles.icon} name="search" size={24} color={colors.palette.primary200} />
          )}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.notFoundText} tx="HomeScreens.SearchScreen.notFound" />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: spacing.md,
    padding: spacing.md,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
  },
  icon: {
    paddingRight: spacing.sm,
  },
  notFoundText: {
    textAlign: "center",
  },
  searchInput: {
    flex: 1,
  },
})
