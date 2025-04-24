import { currentUser } from '@/assets/user.data'
import { WorkSpaceModel } from '@/types/model/workspace.model'

const workSpacesData: WorkSpaceModel[] = [
  {
    id: 'wp-001',
    name: 'LT Web',
    description: 'workspace danh cho LT Web',
    owner: currentUser,
    dtStart: new Date(),
    numSprint: 10,
    timePerSprint: 1
  },
  {
    id: 'wp-002',
    name: 'LT Mobile',
    description: 'workspace danh cho LT Mobile',
    owner: currentUser,
    dtStart: new Date(),
    numSprint: 10,
    timePerSprint: 1
  },
  {
    id: 'wp-003',
    name: 'ML',
    description: 'workspace danh cho ML',
    owner: currentUser,
    dtStart: new Date(),
    numSprint: 10,
    timePerSprint: 1
  }
]

export { workSpacesData }
