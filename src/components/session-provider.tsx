'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { AppSession } from '@/auth'

type Status = 'loading' | 'authenticated' | 'unauthenticated'

interface SessionContextValue {
  data: AppSession | null
  status: Status
  refresh: () => Promise<void>
}

const SessionContext = createContext<SessionContextValue>({
  data: null,
  status: 'loading',
  refresh: async () => {},
})

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppSession | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/me', { cache: 'no-store' })
      const session: AppSession | null = res.ok ? await res.json() : null
      setData(session)
      setStatus(session ? 'authenticated' : 'unauthenticated')
    } catch {
      setData(null)
      setStatus('unauthenticated')
    }
  }, [])

  useEffect(() => {
    refresh()
    const {
      data: { subscription },
    } = createClient().auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') refresh()
    })
    return () => subscription.unsubscribe()
  }, [refresh])

  const value = useMemo(() => ({ data, status, refresh }), [data, status, refresh])
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  return useContext(SessionContext)
}
