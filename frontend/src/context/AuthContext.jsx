import { createContext, useContext, useState } from 'react'
import { login as loginApi } from '../api/authApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(() => localStorage.getItem('username'))
  const [role, setRole] = useState(() => localStorage.getItem('role'))
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  const login = async (u, p) => {
    const res = await loginApi(u, p)
    localStorage.setItem('token', res.token)
    localStorage.setItem('username', res.username)
    localStorage.setItem('role', res.role)
    setToken(res.token)
    setUsername(res.username)
    setRole(res.role)
    return res
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    setToken(null)
    setUsername(null)
    setRole(null)
  }

  const isAuthenticated = Boolean(token)

  return (
    <AuthContext.Provider value={{ username, role, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}