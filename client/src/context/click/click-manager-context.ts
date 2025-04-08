import { createContext } from 'react'

type ClickManagerContextType = {
  activeId: string | null
  setActiveId: (id: string | null) => void
}

const ClickManagerContext = createContext<ClickManagerContextType>({
  activeId: null,
  setActiveId: () => {}
})

export default ClickManagerContext
