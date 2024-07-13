import React from "react"
import { PressableOpacity, SvgIcon, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface HomeHeaderProps {
  onPressSearch: () => void
  onPressProfile: () => void
}

export const HomeHeader = ({ onPressSearch, onPressProfile }: HomeHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.appName}>
        <SvgIcon name="Musicologo" size={40} />
        <Text style={styles.text} tx="common.appName" preset="subheading" />
      </View>
      <View style={styles.menu}>
        <PressableOpacity onPress={onPressSearch}>
          <Icon name="search" size={30} color={colors.palette.neutral100} />
        </PressableOpacity>
        <PressableOpacity onPress={onPressProfile}>
          <Icon name="person" size={30} color={colors.palette.neutral100} />
        </PressableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appName: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
  },
  menu: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.lg,
  },
  text: {
    color: colors.palette.neutral100,
  },
})
