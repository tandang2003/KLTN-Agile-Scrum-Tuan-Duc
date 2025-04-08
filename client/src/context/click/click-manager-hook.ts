import ClickManagerContext from '@/context/click/click-manager-context'
import { useContext } from 'react'
import { useEffect, useRef } from 'react'

const useClickManager = () => useContext(ClickManagerContext)

const useClickHandler = (
  id: string,
  onClickInside: () => void,
  onClickOutside: () => void
) => {
  const ref = useRef<HTMLDivElement>(null)
  const { activeId, setActiveId } = useClickManager()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const clickedInside = ref.current?.contains(e.target as Node)
      if (clickedInside) {
        setActiveId(id)
        onClickInside()
      } else if (activeId === id) {
        onClickOutside()
        setActiveId(null)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [activeId, id, onClickInside, onClickOutside, setActiveId])

  return ref
}

export { useClickManager, useClickHandler }
