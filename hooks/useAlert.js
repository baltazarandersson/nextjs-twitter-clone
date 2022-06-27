import { useEffect, useState } from "react"

export const ALERT_TYPES = {
  ERROR: 0,
  WARNING: 1,
  SUCCESS: 2,
}

export default function useAlert() {
  const [shownAlert, setNewAlert] = useState(false)

  useEffect(() => {
    if (shownAlert) {
      setTimeout(() => {
        setNewAlert(false)
      }, [shownAlert.duration])
    }
  }, [shownAlert])

  function createNewAlert({ type, title, message, duration = 5000 }) {
    setNewAlert({
      type,
      title,
      message,
      duration,
    })
  }

  return { shownAlert, createNewAlert }
}
