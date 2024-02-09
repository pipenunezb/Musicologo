import { type NumberProp, type SvgProps } from "react-native-svg"
import Musicologo from "assets/svgs/Musicologo.svg"
import React from "react"

const SvgIconRegistry = {
  Musicologo,
}

interface SvgIconProps extends SvgProps {
  name: keyof typeof SvgIconRegistry
  size?: NumberProp
}

export const SvgIcon = (props: SvgIconProps) => {
  const { name, size, width, height, ...rest } = props
  const Component = SvgIconRegistry[name]
  const componentProps = {
    width: size ?? width,
    height: size ?? height,
    ...rest,
  }

  return <Component {...componentProps} />
}
