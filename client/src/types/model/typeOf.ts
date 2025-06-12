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

enum IssueRelationShip {
  BLOCKS = 'BLOCKS',
  IS_BLOCKED_BY = 'IS_BLOCKED_BY',
  RELATES_TO = 'RELATES_TO',
  IS_RELATED_TO = 'IS_RELATED_TO',
  DEPENDS_ON = 'DEPENDS_ON',
  IS_DEPENDED_ON_BY = 'IS_DEPENDED_ON_BY',
  SUPERSEDES = 'SUPERSEDES',
  IS_SUPERSEDED_BY = 'IS_SUPERSEDED_BY',
  DUPLICATES = 'DUPLICATES',
  IS_DUPLICATED_BY = 'IS_DUPLICATED_BY'
}

export type { IssueStatus, IssuePriority, IssueTag, SprintStatusType }
export {
  issueStatusList,
  statusOrder,
  issueTagList,
  issuePriorityList,
  sprintStatusList,
  IssueRelationShip
}
