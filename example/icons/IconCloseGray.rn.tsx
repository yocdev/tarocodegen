import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconCloseGray(props) {
  return (
    <Svg width={26} height={25} xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M18.7 6.795L7.318 18.179m.236-11.147l10.91 10.91"
        stroke="#C8C9CC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        fill="none"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default IconCloseGray;
