import * as React from "react"

function Revit(props) {
  return (
    <svg
      height={21}
      viewBox="0 0 21 21"
      width={21}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.5 9.5l3 3 3-3" transform="translate(1 4)" />
        <path
          d="M8.5.5h3a4 4 0 014 4v8M6.5 3.5l-3-3-3 3"
          transform="translate(1 4)"
        />
        <path d="M10.5 12.5h-3a4 4 0 01-4-4v-8" transform="translate(1 4)" />
      </g>
    </svg>
  )
}

export default Revit
