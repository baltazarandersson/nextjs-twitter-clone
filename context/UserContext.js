import { onAuthChange } from "@firebase/client"
import React, { useContext, useEffect, useState } from "react"

const UserContext = React.createContext()

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export const useUser = () => useContext(UserContext)

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    const unsub = onAuthChange(setUser)
    return () => unsub()
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserContextProvider
