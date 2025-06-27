import { useEffect, useMemo, useState } from 'react'

import LoadingBoundary from '@/components/LoadingBoundary'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  useCreateRelationshipMutation,
  useDeleteRelationshipMutation,
  useGetRelationshipQuery,
  useLazyGetIssueAvailableQuery
} from '@/feature/relationship/relationship.api'
import { IssueResponse } from '@/types/issue.type'
import {
  IssueRelationLabels,
  issueRelationOptions,
  IssueRelationShip
} from '@/types/model/relationship'
import { Id } from '@/types/other.type'
import {
  CreateRelationshipIssueSchema,
  CreateRelationshipIssueType,
  RelationshipResponse
} from '@/types/relationship.type'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Icon from '@/components/Icon'
import { useAlertHost } from '@/components/AleartHost'
type UpdateRelationshipProps = {
  issueId: Id
  initialData?: RelationshipResponse[]
  open?: boolean
  cancel?: () => void
}

const UpdateRelationship = ({
  issueId,
  open,
  cancel
}: UpdateRelationshipProps) => {
  const [form, setForm] = useState<Partial<CreateRelationshipIssueType>>()
  const { data: relationships, isLoading } = useGetRelationshipQuery(issueId)
  const [trigger, { data: issues }] = useLazyGetIssueAvailableQuery()
  const [createIssue] = useCreateRelationshipMutation()

  const handleSubmit = async () => {
    const dataParser = CreateRelationshipIssueSchema.safeParse(form)
    if (!dataParser.success) {
      toast.error('Invalid data')
      return
    }
    const data = dataParser.data
    createIssue({
      issueId: issueId,
      issueRelatedId: data.issueRelatedId.toLowerCase(),
      typeRelation: data.typeRelation
    })
      .unwrap()
      .then(() => {
        toast.message('Create relationship success')
      })
  }

  useEffect(() => {
    if (!open) return
    if (form?.typeRelation) {
      trigger({
        issueId: issueId,
        type: form?.typeRelation as IssueRelationShip
      })
    }
  }, [form?.typeRelation])

  return (
    <div className='border-accent mt-4 flex flex-col gap-3 border-2 p-2'>
      <span className='text-lg'>Linked issue</span>
      <LoadingBoundary<RelationshipResponse[]>
        loading='Loading relationships...'
        fallback='No relationships found'
        data={relationships}
        isLoading={isLoading}
      >
        {(data) => <RelationshipList items={data} issueId={issueId} />}
      </LoadingBoundary>

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
                {issueRelationOptions.map(({ label, value }) => (
                  <SelectItem key={label} value={value}>
                    {label}
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
            <Button
              type='button'
              className='bg-red-500 text-white hover:cursor-pointer hover:opacity-60'
              onClick={() => cancel?.()}
            >
              Cancel
            </Button>
            <Button
              type='button'
              onClick={handleSubmit}
              className='bg-green-500 text-white hover:cursor-pointer hover:opacity-60'
            >
              Create
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

type RelationshipListProps = {
  issueId: Id
  items?: Array<RelationshipResponse>
}

const RelationshipList = ({ items = [], issueId }: RelationshipListProps) => {
  console.log('items', items)
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
          <div key={key}>
            <span className='mt-4 mb-2 inline-block text-base'>
              {IssueRelationLabels[key as IssueRelationShip]}
            </span>
            <div className='mt-2 flex flex-col gap-1'>
              {value.map((item) => {
                return (
                  <RelationshipItem
                    key={item.id}
                    issueRelated={item}
                    issueId={issueId}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

type RelationshipItemProps = Pick<RelationshipResponse, 'issueRelated'> & {
  issueId: Id
}

const RelationshipItem = ({ issueRelated, issueId }: RelationshipItemProps) => {
  const [deleteRelationship] = useDeleteRelationshipMutation()
  const { showDialog } = useAlertHost()
  const handleDelete = () => {
    showDialog({
      title: 'Delete relationship',
      message: `Are you sure you want to delete the relationship with ${issueRelated.name}?`,
      onConfirm: async () => {
        try {
          await deleteRelationship({
            issueId: issueId,
            issueRelatedId: issueRelated.id
          }).unwrap()
          toast.message('Delete relationship success')
        } catch {
          toast.error('Delete relationship failed')
        }
      }
    })
  }
  return (
    <div className='border-accent flex justify-between rounded-md border-2 px-4 py-2 shadow-md'>
      <span>{issueRelated.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon icon={'ri:more-fill'} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='cancel' onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UpdateRelationship
