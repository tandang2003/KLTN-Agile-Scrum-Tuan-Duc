import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import useBoard from '@/hooks/use-board'
import issueService from '@/services/issue.service'
import { IssueRelationShip, issueRelationshipList } from '@/types/model/typeOf'
import { Id } from '@/types/other.type'
import {
  CreateRelationshipIssueSchema,
  CreateRelationshipIssueType,
  RelationshipResponse
} from '@/types/relationship.type'
import { toast } from 'sonner'
import { IssueResponse } from '@/types/issue.type'
type UpdateRelationshipProps = {
  issueId: string
  initialData?: Array<RelationshipResponse>
  open?: boolean
  cancel?: () => void
}

const UpdateRelationship = ({
  issueId,
  initialData = [],
  open,
  cancel
}: UpdateRelationshipProps) => {
  const [form, setForm] = useState<Partial<CreateRelationshipIssueType>>()
  const [initData, setInitData] =
    useState<Array<RelationshipResponse>>(initialData)
  const { projectId } = useAppId()
  const { sprint } = useBoard()

  const { data: issues, isFetching } = useGetListIssueQuery(
    {
      projectId: projectId as Id,
      sprintId: sprint?.id as Id
    },
    {
      skip: !projectId || !sprint?.id
    }
  )

  const handleSubmit = async () => {
    const daParser = CreateRelationshipIssueSchema.safeParse(form)
    if (!daParser.success) {
      toast.error('Invalid data')
      return
    }
    issueService
      .createRelationship({
        issueId: issueId,
        issueRelatedId: daParser.data.issueRelatedId.toLowerCase(),
        typeRelation: daParser.data.typeRelation
      })
      .then((response) => {
        setInitData((prev) => {
          return [...prev, response]
        })
        toast.message('Create relationship success')
      })
  }

  return (
    <div className='border-accent mt-4 flex flex-col gap-3 border-2 p-2'>
      <h3>Linked issue</h3>
      <RelationshipList items={initData} />

      {open && (
        <>
          <div className='flex gap-2'>
            <Select
              value={form?.typeRelation}
              onValueChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  typeRelation: value as IssueRelationShip
                }))
              }}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Relation' />
              </SelectTrigger>
              <SelectContent>
                {Object.values(IssueRelationShip).map((relationship) => (
                  <SelectItem key={relationship} value={relationship}>
                    {relationship}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={form?.issueRelatedId}
              onValueChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  issueRelatedId: value as Id
                }))
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Relation' />
              </SelectTrigger>
              <SelectContent>
                {issues?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='mt-3 flex justify-end gap-2'>
            <Button type='button' onClick={handleSubmit}>
              Create
            </Button>
            <Button
              type='button'
              className='bg-red-500 text-white hover:cursor-pointer hover:opacity-60'
              onClick={() => cancel?.()}
            >
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

type RelationshipListProps = {
  items?: Array<RelationshipResponse>
}

const RelationshipList = ({ items = [] }: RelationshipListProps) => {
  const dataPreprocessing = useMemo(() => {
    const mapType: Record<IssueRelationShip, IssueResponse[]> =
      issueRelationshipList.reduce(
        (acc, key) => {
          acc[key] = []
          return acc
        },
        {} as Record<IssueRelationShip, IssueResponse[]>
      )
    items.forEach((item) => {
      const key = item.typeRelation as IssueRelationShip
      mapType[key].push(item.issueRelated)
    })

    return mapType
  }, [items])

  return (
    <div>
      {Object.entries(dataPreprocessing).map(([key, value]) => {
        if (value.length === 0) return null
        return (
          <div>
            <h4>{key}</h4>
            <div className='flex flex-col gap-2'>
              {value.map((item) => {
                return <RelationshipItem key={item.id} issueRelated={item} />
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

type RelationshipItemProps = Pick<RelationshipResponse, 'issueRelated'>

const RelationshipItem = ({ issueRelated }: RelationshipItemProps) => {
  return (
    <div className='border-accent rounded-md border-2 px-2 py-1 shadow-md'>
      {issueRelated.name}
    </div>
  )
}

export default UpdateRelationship
