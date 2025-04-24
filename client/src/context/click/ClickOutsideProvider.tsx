import React, { useState } from 'react'
import ClickManagerContext from '@/context/click/click-manager-context'

const ClickOutsideProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <ClickManagerContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ClickManagerContext.Provider>
  )
}

export default ClickOutsideProvider
