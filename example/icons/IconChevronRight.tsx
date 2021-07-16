import * as React from "react"

function IconChevronRight(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-chevron-right"
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default IconChevronRight
