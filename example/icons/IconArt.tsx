import React from "react"
import { Image } from "@tarojs/components"
import { ImageProps } from "@tarojs/components/types/Image"
import Art from "./source/art.png"

interface Props extends Omit<ImageProps, "src"> {
  width?: string
  height?: string
}

const IconArt = React.memo((props: Props) => {
  const { width = "40px", height = "40px" } = props

  return <Image src={Art} {...props} style={{ width, height }}></Image>
})

export default IconArt
