import { DEFAULT_LANGUAGE } from "constants/locale"

const isDateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat

export const formatDate = (
  timestamp,
  { language = DEFAULT_LANGUAGE } = {},
  options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
) => {
  const date = new Date(timestamp)

  if (!isDateTimeFormatSupported) {
    return date.toLocaleDateString(language, options)
  }
  return new Intl.DateTimeFormat(language, options).format(date)
}

export default function useDateTimeFormat(
  timestamp,
  { language = DEFAULT_LANGUAGE } = {},
  options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
) {
  return formatDate(timestamp, language, options)
}
