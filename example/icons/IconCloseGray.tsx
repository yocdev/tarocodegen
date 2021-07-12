import React from "react";
import { Image } from "@tarojs/components";
import { ImageProps } from "@tarojs/components/types/Image";
import CloseGray from "./source/close-gray.svg";

type IconProps = Omit<ImageProps, "src">;

const IconCloseGray = React.memo((props: IconProps) => {
  return <Image {...props} src={CloseGray}></Image>;
});

export default IconCloseGray;
