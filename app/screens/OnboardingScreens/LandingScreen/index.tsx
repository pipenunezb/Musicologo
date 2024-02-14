import React, { FC } from "react"
import { AutoImage, Button, Screen, SvgIcon, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { StyleSheet, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"

interface LandingScreenProps extends AppStackScreenProps<"LandingScreen"> {}

export const LandingScreen: FC<LandingScreenProps> = ({ navigation }) => {
  const goToLogin = () => navigation.navigate("LoginScreen")
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.container}
      backgroundColor={colors.palette.neutral900}
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={styles.backgroundImageContainer}>
        <AutoImage
          source={require("assets/images/Onboarding/background-image.jpeg")}
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.body}>
        <SvgIcon
          name="Musicologo"
          size={120}
          color={colors.palette.neutral100}
          fill={colors.palette.neutral100}
        />
        <Text style={styles.text} text="Musicologo" preset="heading" />
        <Text style={styles.text} text="La música que se escucha en la calle" preset="subheading" />
      </View>
      <View style={styles.footer}>
        <Button text="Comenzar" preset="filled" onPress={goToLogin} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  backgroundImageContainer: {
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  body: {
    alignItems: "center",
    flex: 1,
    gap: spacing.md,
  },
  container: {
    flex: 1,
  },
  footer: {
    bottom: 0,
    padding: spacing.lg,
    position: "absolute",
    width: "100%",
  },
  text: {
    color: colors.palette.neutral100,
  },
})
