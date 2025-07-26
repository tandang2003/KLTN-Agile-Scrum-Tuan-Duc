import Empty from '@/components/Empty'
import TitleLevel from '@/components/issue/TitleLevel'
import ListView from '@/components/ListView'
import { Badge } from '@/components/ui/badge'
import messages, { getRelationshipDisplayName } from '@/constant/message.const'
import { IssueResponse } from '@/types/issue.type'
import {
  issueRelationOptions,
  IssueRelationShip
} from '@/types/model/relationship'
import { RelationshipResponse } from '@/types/relationship.type'
import { useMemo } from 'react'
type ViewRelationshipProps = {
  items?: Array<RelationshipResponse>
}

const ViewRelationship = ({ items = [] }: ViewRelationshipProps) => {
  const message = messages.component.issue.update.form.relationship

  const dataPreprocessing = useMemo<
    Record<IssueRelationShip, IssueResponse[]>
  >(() => {
    const mapType: Record<IssueRelationShip, IssueResponse[]> =
      issueRelationOptions.reduce(
        (acc, { value }) => {
          acc[value] = []
          return acc
        },
        {} as Record<IssueRelationShip, IssueResponse[]>
      )
    items?.forEach((item) => {
      const key = item.typeRelation as IssueRelationShip
      mapType[key].push(item.issueRelated)
    })

    return mapType
  }, [items])

  return (
    <div>
      <TitleLevel level={'lv-2'}>{message.title}</TitleLevel>
      {Object.entries(dataPreprocessing).map(([key, value]) => {
        if (value.length === 0) return null
        return (
          <div key={key} className='mt-2 flex gap-3'>
            <TitleLevel level={'lv-4'} className='mt-2'>
              {getRelationshipDisplayName(key as IssueRelationShip)}
            </TitleLevel>
            <ListView
              data={value}
              className='flex flex-1 flex-col gap-1'
              emptyComponent={<Empty>Không có mối quan hệ</Empty>}
              render={(item) => (
                <div className='border-accent flex justify-between rounded-md border-2 px-4 py-2 shadow-md'>
                  <span>{item.name}</span>
                  <Badge status={item.status}>{item.status}</Badge>
                </div>
              )}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ViewRelationship
