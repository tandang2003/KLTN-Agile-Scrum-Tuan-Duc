import { IssueResponse } from '@/types/issue.type'
import { IssueStatusEnum } from '@/types/model/enum'
import { Id } from '@/types/other.type'
import { SprintResponse } from '@/types/sprint.type'
import { addDays } from 'date-fns'

const currentDay = new Date()

type SprintName =
  | 'sprint-001'
  | 'sprint-002'
  | 'sprint-003'
  | 'sprint-004'
  | 'sprint-005'

const sprintData: Record<SprintName, SprintResponse> = {
  'sprint-001': {
    id: 'sprint-001',
    position: 1,
    title: 'Tìm hiểu bài toán',
    miniumStoryPoint: 10,
    start: currentDay,
    predict: addDays(currentDay, 7),
    end: addDays(currentDay, 10)
  },
  'sprint-002': {
    id: 'sprint-002',
    position: 2,
    title: 'Phân tích hệ thống',
    miniumStoryPoint: 10,
    start: currentDay,
    predict: addDays(currentDay, 7),
    end: addDays(currentDay, 10)
  },
  'sprint-003': {
    id: 'sprint-003',
    position: 3,
    title: 'Implementation Auth Module, Error handling global',
    miniumStoryPoint: 10,
    start: currentDay,
    predict: addDays(currentDay, 7),
    end: addDays(currentDay, 10)
  },
  'sprint-004': {
    id: 'sprint-004',
    position: 3,
    title: 'Implementation Auth Module, Error handling global',
    miniumStoryPoint: 10,
    start: currentDay,
    predict: addDays(currentDay, 7),
    end: addDays(currentDay, 10)
  },
  'sprint-005': {
    id: 'sprint-004',
    position: 3,
    title: 'Implementation Auth Module, Error handling global',
    miniumStoryPoint: 10,
    start: currentDay,
    predict: addDays(currentDay, 7),
    end: addDays(currentDay, 10)
  }
}

const issueData: Record<SprintName, IssueResponse[]> = {
  'sprint-001': [
    {
      id: 'issue-101',
      title: '',
      sprintId: 'sprint-1' as SprintName,
      projectId: 'project-1',
      position: 1,
      status: IssueStatusEnum.BACKLOG,
      assigner: {
        id: 'user-001',
        email: '21130001@st.hcmuaf.edu.vn',
        name: 'Nguyen Van A'
      },
      reviewer: {
        id: 'user-002',
        email: '21130002@st.hcmuaf.edu.vn',
        name: 'Nguyen Van B'
      }
    },
    {
      id: 'issue-002',
      title: '',
      sprintId: 'sprint-1',
      projectId: 'project-1',
      position: 2,
      status: IssueStatusEnum.BACKLOG,
      assigner: {
        id: 'user-001',
        email: '21130001@st.hcmuaf.edu.vn',
        name: 'Nguyen Van A'
      },
      reviewer: {
        id: 'user-002',
        email: '21130002@st.hcmuaf.edu.vn',
        name: 'Nguyen Van B'
      }
    }
  ],
  'sprint-002': [],
  'sprint-003': []
}

export { issueData }
