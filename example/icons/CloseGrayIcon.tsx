import React from "react";
import { Image } from "@tarojs/components";
import { ImageProps } from "@tarojs/components/types/Image";
import CloseGray from "./source/close-gray.svg";

interface Props extends Omit<ImageProps, "src"> {
  width?: string;
  height?: string;
}

const CloseGrayIcon = React.memo((props: Props) => {
  const { width = "40px", height = "40px" } = props;

  return <Image src={CloseGray} {...props} style={{ width, height }}></Image>;
});

export default CloseGrayIcon;
