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

const issueTagList = ['THEORY', ' PRACTICE']

type IssueTag = (typeof issueTagList)[number]

export type { IssueStatus, IssuePriority, IssueTag }
export { issueStatusList, statusOrder, issueTagList, issuePriorityList }
