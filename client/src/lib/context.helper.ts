import { createContext, useContext } from 'react'

export function createCtx<A extends object | null>() {
  const ctx = createContext<A | undefined>(undefined)

  function useCtx() {
    const c = useContext(ctx)
    if (c === undefined) {
      throw new Error('Context must be used within a Provider')
    }
    return c
  }

  return [useCtx, ctx.Provider] as const
}
