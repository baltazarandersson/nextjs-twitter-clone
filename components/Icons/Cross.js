import * as React from "react"

function Cross(props) {
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
        <path d="M10.5 10.5L.5.5zM10.5.5l-10 10" transform="translate(5 5)" />
      </g>
    </svg>
  )
}

export default Cross
