export enum IssueRelationShip {
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
export const IssueRelationLabels: Record<IssueRelationShip, string> = {
  [IssueRelationShip.BLOCKS]: 'Blocks',
  [IssueRelationShip.IS_BLOCKED_BY]: 'Is Blocked By',
  [IssueRelationShip.RELATES_TO]: 'Relates To',
  [IssueRelationShip.IS_RELATED_TO]: 'Is Related To',
  [IssueRelationShip.DEPENDS_ON]: 'Depends On',
  [IssueRelationShip.IS_DEPENDED_ON_BY]: 'Is Depended On By',
  [IssueRelationShip.SUPERSEDES]: 'Supersedes',
  [IssueRelationShip.IS_SUPERSEDED_BY]: 'Is Superseded By',
  [IssueRelationShip.DUPLICATES]: 'Duplicates',
  [IssueRelationShip.IS_DUPLICATED_BY]: 'Is Duplicated By'
}

export const issueRelationOptions = Object.entries(IssueRelationLabels).map(
  ([value, label]) => ({
    value: value as IssueRelationShip,
    label
  })
)
