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

type IssuePriority = 'CRITICAL' | 'MAJOR' | 'MINOR' | 'TRIVIAL' | 'BLOCKED'

type IssueTag = 'THEORY' | ' PRACTICE'
export type { IssueStatus, IssuePriority, IssueTag }
export { issueStatusList, statusOrder }
