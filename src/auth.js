import React, { createContext, useContext, useState } from 'react'

// 1) Create the context
const AuthContext = createContext()

// 2) Export a Provider you’ll wrap your app in
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // our “login” only accepts username=test & password=test
  const login = (username, password) => {
    if (username === 'test' && password === 'test') {
      setUser({ username })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3) Hook for components to consume auth
export function useAuth() {
  return useContext(AuthContext)
}
