import { IssueResponse } from '@/types/issue.type'
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
    title: 'Implementation core business (product)',
    miniumStoryPoint: 10,
    start: currentDay,
    predict: addDays(currentDay, 7),
    end: addDays(currentDay, 10)
  }
}

type IssueDemo = Pick<IssueResponse, 'title' | 'status' | 'position'> &
  Partial<
    Pick<
      IssueResponse,
      'assigner' | 'reviewer' | 'dtStart' | 'dtEnd' | 'id' | 'storyPoint'
    >
  >

const issueData: Record<SprintName, IssueDemo[]> = {
  'sprint-001': [
    {
      title: 'Mục đích lựa chọn bài toán',
      position: 1,
      status: 'BACKLOG',
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
      id: 'issue-102',
      title: 'Các actor tham gia',
      position: 2,
      status: 'BACKLOG',
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
      id: 'issue-103',
      title: 'Chức năng chính',
      position: 2,
      status: 'BACKLOG',
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
      id: 'issue-104',
      title: 'Chức năng đi kèm',
      position: 2,
      status: 'BACKLOG',
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
      id: 'issue-105',
      title: 'Các yêu cầu phi chức năng',
      position: 2,
      status: 'BACKLOG',
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
  'sprint-002': [
    {
      id: 'issue-201',
      title: 'Use case, specification use case',
      position: 1,
      status: 'BACKLOG',
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
      id: 'issue-102',
      title: 'ERD ',
      position: 2,
      status: 'BACKLOG',
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
      id: 'issue-103',
      title: 'Tìm hiểu các công nghệ sử dụng',
      position: 2,
      status: 'BACKLOG',
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
      id: 'issue-104',
      title: 'folder structure, coding convention',
      position: 2,
      status: 'BACKLOG',
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
  'sprint-003': [
    {
      id: 'issue-101',
      title: 'Tìm hiểu các cơ chế authentication và authorization',
      position: 1,
      status: 'BACKLOG',
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
      id: 'issue-101',
      title: 'Các ràng buộc đối với mật khẩu',
      position: 1,
      status: 'BACKLOG',
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
      id: 'issue-101',
      title: 'Thực hiện front-end',
      position: 1,
      status: 'BACKLOG',
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
      id: 'issue-101',
      title: 'Thực hiện back-end',
      position: 1,
      status: 'DONE',
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
      id: 'issue-101',
      title: 'cấu hình global error page',
      position: 1,
      status: 'BACKLOG',
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
  'sprint-004': [],
  'sprint-005': []
}

const convertIssueData = (
  data: Record<SprintName, IssueDemo[]>
): IssueResponse[] => {
  const result: IssueResponse[] = []
  Object.entries(data).forEach(([name, values], index) => {
    const sprints: IssueResponse[] = values.map((issue, indexChild) => {
      return {
        ...issue,
        id: `issue-${index + 1}0${indexChild + 1}`,
        sprintId: name,
        storyPoint: 10,
        projectId: 'project-001',
        dtStart: addDays(currentDay, 7),
        dtEnd: addDays(currentDay, 10)
      }
    })
    result.push(...sprints)
  })
  return result
}

const issueDataExport = convertIssueData(issueData)

export { issueDataExport as issueData }
