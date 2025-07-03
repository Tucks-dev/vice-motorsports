import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'

export default function RequireAuth({ children }) {
  const { user } = useAuth()

  // if you’re not “logged in”, redirect to /login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
