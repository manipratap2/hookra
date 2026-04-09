import { createContext, useContext, useState, type ReactNode } from 'react'
import { versions, type VersionInfo } from '../data/versions'

interface VersionContextValue {
  current: VersionInfo
  all: VersionInfo[]
  setVersion: (version: string) => void
}

const VersionContext = createContext<VersionContextValue | null>(null)

export function VersionProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<VersionInfo>(versions[0])

  const setVersion = (version: string) => {
    const found = versions.find((v) => v.version === version)
    if (found) setCurrent(found)
  }

  return (
    <VersionContext.Provider value={{ current, all: versions, setVersion }}>
      {children}
    </VersionContext.Provider>
  )
}

export function useVersion() {
  const ctx = useContext(VersionContext)
  if (!ctx) throw new Error('useVersion must be used within VersionProvider')
  return ctx
}
