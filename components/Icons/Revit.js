import * as React from "react"

const Revit = (props) => (
  <svg height={21} width={21} viewBox="0 0 21 21" {...props}>
    <g
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m13.5 13.5 3 3 3-3" />
      <path d="M9.5 4.5h3a4 4 0 0 1 4 4v8M7.5 7.5l-3-3-3 3" />
      <path d="M11.5 16.5h-3a4 4 0 0 1-4-4v-8" />
    </g>
  </svg>
)

export default Revit
