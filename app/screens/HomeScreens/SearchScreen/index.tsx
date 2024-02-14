import { Screen, Text, TextField } from "app/components"
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
      <View style={styles.body}>
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
        <Text tx="HomeScreens.SearchScreen.notFound" />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 1,
    gap: spacing.md,
    padding: spacing.md,
    width: "100%",
  },
  container: {
    flex: 1,
  },
  icon: {
    paddingRight: spacing.sm,
  },
  searchInput: {
    width: "100%",
  },
})
