import * as React from "react"

const Cross = (props) => (
  <svg height={21} width={21} viewBox="0 0 21 21" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.5 15.5-10-10zM15.5 5.5l-10 10" />
    </g>
  </svg>
)

export default Cross
