import * as React from "react"

function ArrowLeft(props) {
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
        <path
          d="M4.499.497L.5 4.499l4 4.001M13.5 4.5H.5"
          transform="translate(3 6)"
        />
      </g>
    </svg>
  )
}

export default ArrowLeft
