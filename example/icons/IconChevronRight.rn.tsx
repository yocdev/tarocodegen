import * as React from "react"
import Svg, { Path } from "react-native-svg"

function IconChevronRight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-chevron-right"
      {...props}
    >
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  )
}

export default IconChevronRight
