import { Id } from '@/types/other.type'
import { createContext, useContext, useState } from 'react'

type Sprint = {
  id: Id
  start: Date
  end: Date
}

type SelectSprintContextType = {
  setSprint: (data: Sprint) => void
  sprint?: Sprint
}

const SelectSprintContext = createContext<SelectSprintContextType | null>(null)

const useSelectSprintContext = () => {
  const context = useContext(SelectSprintContext)
  if (!context) {
    throw new Error(
      'useSelectSprintContext must be used within a SelectSprintProvider'
    )
  }
  return context
}

type SelectSprintProviderProps = {
  children?: React.ReactNode
}

const SelectSprintProvider = ({ children }: SelectSprintProviderProps) => {
  const [sprint, setSprint] = useState<Sprint | undefined>(undefined)
  return (
    <SelectSprintContext.Provider
      value={{
        sprint: sprint,
        setSprint: (data: Sprint) => {
          setSprint(data)
        }
      }}
    >
      {children}
    </SelectSprintContext.Provider>
  )
}
export { SelectSprintProvider, useSelectSprintContext }
