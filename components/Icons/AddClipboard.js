import * as React from "react"

function AddClipboard(props) {
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
          d="M3.5 1.5h-2a1 1 0 00-1 1v11a1 1 0 001 1h10a1 1 0 001-1v-11a1 1 0 00-1-1h-2"
          transform="translate(4 3)"
        />
        <path
          d="M4.5.5h4a1 1 0 110 2h-4a1 1 0 110-2zM6.5 5.5v6.056M9.5 8.5h-6"
          transform="translate(4 3)"
        />
      </g>
    </svg>
  )
}

export default AddClipboard
