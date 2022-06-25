import * as React from "react"

function Calendar(props) {
  return (
    <svg
      height={21}
      viewBox="0 0 21 21"
      width={21}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M2.5.5h12a2 2 0 012 2v12a2 2 0 01-2 2h-12a2 2 0 01-2-2v-12a2 2 0 012-2zM.5 4.5h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(2 2)"
        />
        <g fill="currentColor" transform="translate(2 2)">
          <circle cx={8.5} cy={8.5} r={1} />
          <circle cx={4.5} cy={8.5} r={1} />
          <circle cx={12.5} cy={8.5} r={1} />
          <circle cx={8.5} cy={12.5} r={1} />
          <circle cx={4.5} cy={12.5} r={1} />
          <circle cx={12.5} cy={12.5} r={1} />
        </g>
      </g>
    </svg>
  )
}

export default Calendar
