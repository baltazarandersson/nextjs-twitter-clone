import * as React from "react"

function Create(props) {
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
          d="M7 1.5H2.5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8"
          transform="translate(3 3)"
        />
        <path
          d="M14.5.467a1.462 1.462 0 01-.017 2.05L7.5 9.5l-3 1 1-3L12.487.454A1.409 1.409 0 0114.372.35zM12.5 2.5l.953 1"
          transform="translate(3 3)"
        />
      </g>
    </svg>
  )
}

export default Create
