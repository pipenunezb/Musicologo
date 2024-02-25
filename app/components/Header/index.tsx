import { StyleSheet, View } from "react-native"
import { PressableOpacity } from "../PressableOpacity"
import Icon from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { Text } from "../Text"
import React from "react"
import { colors, spacing } from "app/theme"

interface HeaderProps {
  title: string
  hasBackButton?: boolean
  IconButton?: React.ReactNode
}

export const Header = ({ title, hasBackButton, IconButton }: HeaderProps) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {hasBackButton ? (
        <PressableOpacity style={styles.backContainer} onPress={navigation.goBack}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </PressableOpacity>
      ) : (
        <View style={styles.emptyView} />
      )}
      <Text text={title} preset="subheading" />

      {IconButton ?? <View style={styles.emptyView} />}
    </View>
  )
}

const styles = StyleSheet.create({
  backContainer: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    width: "100%",
  },
  emptyView: {
    width: 40,
  },
})
