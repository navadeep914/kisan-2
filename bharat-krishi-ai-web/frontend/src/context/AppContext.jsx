import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [user, setUser]         = useState(null)

  return (
    <AppContext.Provider value={{ language, setLanguage, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
