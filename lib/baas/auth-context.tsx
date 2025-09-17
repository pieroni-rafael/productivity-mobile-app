'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { baas, type User } from './client'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await baas.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const user = await baas.signIn(email, password)
      setUser(user)
      
      // Mock: Save to localStorage for development
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_auth', JSON.stringify(user))
      }
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const user = await baas.signUp(email, password, name)
      setUser(user)
      
      // Mock: Save to localStorage for development
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_auth', JSON.stringify(user))
      }
      
      router.push('/dashboard')
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await baas.signOut()
      setUser(null)
      
      // Mock: Clear localStorage for development
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mock_auth')
      }
      
      router.push('/login')
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      // TODO: Implement profile update
      console.log('Update profile:', data)
      
      if (user) {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
        
        // Mock: Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('mock_auth', JSON.stringify(updatedUser))
        }
      }
    } catch (error) {
      console.error('Update profile error:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}