import * as React from "react"

function Home(props) {
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
          d="M.5 9.5l9-9 9 9M2.5 10.5v4a2 2 0 002 2h10a2 2 0 002-2v-4"
          transform="translate(1 1)"
        />
      </g>
    </svg>
  )
}

export default Home
