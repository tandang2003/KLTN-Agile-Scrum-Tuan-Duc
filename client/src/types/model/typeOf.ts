const issueStatusList = [
  'BACKLOG',
  'TODO',
  'INPROCESS',
  'REVIEW',
  'DONE'
] as const

const statusOrder: IssueStatus[] = [
  'BACKLOG',
  'TODO',
  'INPROCESS',
  'REVIEW',
  'DONE'
]

type IssueStatus = (typeof issueStatusList)[number]

const issuePriorityList = [
  'CRITICAL',
  'MAJOR',
  'MINOR',
  'TRIVIAL',
  'BLOCKED'
] as const

type IssuePriority = (typeof issuePriorityList)[number]

const issueTagList = ['THEORY', 'PRACTICE'] as const

type IssueTag = (typeof issueTagList)[number]

const sprintStatusList = ['PENDING', 'COMPLETE', 'RUNNING'] as const

type SprintStatusType = (typeof sprintStatusList)[number]

export type { IssueStatus, IssuePriority, IssueTag, SprintStatusType }
export {
  issueStatusList,
  statusOrder,
  issueTagList,
  issuePriorityList,
  sprintStatusList
}
