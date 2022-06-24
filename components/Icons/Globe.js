import * as React from "react"

function Globe(props) {
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
          d="M8 16c4.438 0 8-3.526 8-7.964C16 3.598 12.438 0 8 0 3.562 0 0 3.598 0 8.036S3.562 16 8 16zM1 5h14M1 11h14"
          transform="translate(2 3)"
        />
        <path
          d="M8 16c2.219 0 4-3.526 4-7.964C12 3.598 10.219 0 8 0 5.781 0 4 3.598 4 8.036S5.781 16 8 16z"
          transform="translate(2 3)"
        />
      </g>
    </svg>
  )
}

export default Globe
