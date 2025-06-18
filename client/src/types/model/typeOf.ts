const issueStatusList = ['TODO', 'INPROCESS', 'REVIEW', 'DONE'] as const

const statusOrder: IssueStatus[] = ['TODO', 'INPROCESS', 'REVIEW', 'DONE']

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

enum SkillLevel {
  Beginner = 1,
  Intermediate = 2,
  Proficient = 3,
  Advanced = 4,
  Expert = 5
}

const skillLevelList = Object.keys(SkillLevel).filter(
  (key): key is keyof typeof SkillLevel => isNaN(Number(key))
)

export type { IssueStatus, IssuePriority, IssueTag, SprintStatusType }
export {
  issueStatusList,
  statusOrder,
  issueTagList,
  issuePriorityList,
  sprintStatusList,
  skillLevelList,
  SkillLevel
}
