import * as React from "react"

function Trash(props) {
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
          d="M2.5 2.5h10v12a2 2 0 01-2 2h-6a2 2 0 01-2-2zm5-2a2 2 0 011.995 1.85l.005.15h-4a2 2 0 012-2zM.5 2.5h14M5.5 5.5v8M9.5 5.5v8"
          transform="translate(3 2)"
        />
      </g>
    </svg>
  )
}

export default Trash
