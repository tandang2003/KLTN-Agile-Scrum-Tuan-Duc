import { useAppSelector } from '@/context/redux/hook'

const useSprintCurrent = () => {
  const sprintCurrent = useAppSelector((state) => state.sprintSlice.current)
  if (!sprintCurrent) {
    throw new Error(
      'useSprintCurrent should not be used in this context, please use it in a component that is wrapped with the Redux Provider.'
    )
  }
  return {
    ...sprintCurrent
  }
}

export default useSprintCurrent
