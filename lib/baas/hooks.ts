'use client'

import { useState, useEffect } from 'react'
import { baas } from './client'

// Hook for fetching data
export function useQuery<T = any>(
  collection: string, 
  id?: string
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let result
        
        if (id) {
          result = await baas.collection(collection).get(id)
        } else {
          result = await baas.collection(collection).list()
        }
        
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [collection, id])

  return { data, loading, error }
}

// Hook for mutations (create, update, delete)
export function useMutation<T = any>(collection: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const create = async (data: Partial<T>): Promise<T | null> => {
    try {
      setLoading(true)
      setError(null)
      const result = await baas.collection(collection).create(data)
      return result
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, data: Partial<T>): Promise<T | null> => {
    try {
      setLoading(true)
      setError(null)
      const result = await baas.collection(collection).update(id, data)
      return result
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      await baas.collection(collection).delete(id)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    create,
    update,
    remove,
    loading,
    error
  }
}

// Hook for real-time subscriptions
export function useSubscription<T = any>(
  collection: string,
  callback?: (data: T) => void
) {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const unsubscribe = baas.subscribe(collection, (newData) => {
      setData(newData)
      if (callback) {
        callback(newData)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [collection, callback])

  return data
}

// Hook for file uploads
export function useStorage() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const upload = async (file: File, path?: string): Promise<string | null> => {
    try {
      setUploading(true)
      setError(null)
      const url = await baas.storage.upload(file, path)
      return url
    } catch (err) {
      setError(err as Error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const remove = async (url: string): Promise<boolean> => {
    try {
      setError(null)
      await baas.storage.delete(url)
      return true
    } catch (err) {
      setError(err as Error)
      return false
    }
  }

  return {
    upload,
    remove,
    uploading,
    error
  }
}