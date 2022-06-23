import { useEffect, useState } from "react"

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const INTERVALS = {
  second: 5000,
  minute: 15000,
  hour: 900000,
  day: 54000000,
}

const getDateDiffs = (timeStamp) => {
  const now = Date.now()
  const elapsedTime = (timeStamp - now) / 1000

  let time
  for (const [unit, unitInSeconds] of DATE_UNITS) {
    if (Math.abs(elapsedTime) > unitInSeconds || unit === "second") {
      const elapsedTimeInUnits = Math.ceil(elapsedTime / unitInSeconds)
      return {
        value: elapsedTimeInUnits,
        unit,
      }
    }
  }
  return time
}

export default function useTimeAgo(timeStamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timeStamp))

  useEffect(() => {
    const updateInterval = INTERVALS[timeAgo.unit]
    const timeout = setTimeout(() => {
      const newTimeAgo = getDateDiffs(timeStamp)
      setTimeAgo(newTimeAgo)
    }, updateInterval)

    return () => clearTimeout(timeout)
  }, [timeAgo])

  const { value, unit } = timeAgo
  const rtf = new Intl.RelativeTimeFormat("en", { style: "short" })
  return rtf.format(value, unit)
}
