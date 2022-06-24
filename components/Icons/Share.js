import * as React from "react"

function Share(props) {
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
          d="M11.5 4.5L7.522.5 3.5 4.5M7.522.521V12.5M4.5 7.5h-2a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4a2 2 0 00-2-2h-2"
          transform="translate(3 3)"
        />
      </g>
    </svg>
  )
}

export default Share
