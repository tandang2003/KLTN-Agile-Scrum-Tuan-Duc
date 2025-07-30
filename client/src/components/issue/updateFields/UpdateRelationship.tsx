import { useEffect, useMemo, useState } from 'react'

import { useAlertHost } from '@/components/AlertHost'
import Icon from '@/components/Icon'
import LoadingBoundary from '@/components/LoadingBoundary'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import messages, { getRelationshipDisplayName } from '@/constant/message.const'
import {
  useCreateRelationshipMutation,
  useDeleteRelationshipMutation,
  useGetRelationshipQuery,
  useLazyGetIssueAvailableQuery
} from '@/feature/relationship/relationship.api'
import { IssueResponse } from '@/types/issue.type'
import {
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
import Message from '@/components/Message'
import _ from 'lodash'
import TitleLevel from '@/components/TitleLevel'
type UpdateRelationshipProps = {
  issueId: Id
  initialData?: RelationshipResponse[]
}

const UpdateRelationship = ({ issueId }: UpdateRelationshipProps) => {
  const message = messages.component.issue.update.form.relationship
  const [form, setForm] = useState<Partial<CreateRelationshipIssueType>>({
    typeRelation: 'BLOCKS'
  })
  const { data: relationships, isLoading } = useGetRelationshipQuery(issueId)
  const [trigger, { data: issues }] = useLazyGetIssueAvailableQuery()
  const [createIssue] = useCreateRelationshipMutation()
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    trigger({
      issueId: issueId,
      type: form?.typeRelation as IssueRelationShip
    })
  }, [])

  const handleSubmit = async () => {
    const dataParser = CreateRelationshipIssueSchema.safeParse(form)
    if (!dataParser.success) {
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
        toast.message(message.success)
        setForm({
          typeRelation: 'BLOCKS'
        })
      })
      .catch((err) => {
        toast.error(message.failed, {
          description: err.data?.message || 'An error occurred.'
        })
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
    <div className='flex flex-col gap-3'>
      <TitleLevel level={'lv-2'}>{message.title}</TitleLevel>
      <LoadingBoundary<RelationshipResponse[]>
        loading='Loading relationships...'
        fallback={message.fallback}
        data={relationships}
        isLoading={isLoading}
      >
        {(data) => <RelationshipList items={data} issueId={issueId} />}
      </LoadingBoundary>

      {open === false ? (
        <Button variant='outline' onClick={() => setOpen(true)}>
          <Icon icon={'ic:baseline-plus'} />
        </Button>
      ) : (
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
                    {getRelationshipDisplayName(value)}
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
                {_.orderBy(issues, ['name'])?.map((item) => (
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
              onClick={() => setOpen(false)}
            >
              {message.cancel}
            </Button>
            <Button
              type='button'
              onClick={handleSubmit}
              className='bg-green-500 text-white hover:cursor-pointer hover:opacity-60'
            >
              {message.add}
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
            <TitleLevel level={'lv-3'} className='mt-2 inline-block'>
              {getRelationshipDisplayName(key as IssueRelationShip)}
            </TitleLevel>
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
  const message = messages.component.issue.update.form.relationship
  const [deleteRelationship] = useDeleteRelationshipMutation()
  const { showAlert } = useAlertHost()
  const handleDelete = () => {
    showAlert({
      title: message.delete.title,
      type: 'warning',
      message: (
        <Message
          template={message.delete.message}
          values={{
            name: issueRelated.name
          }}
        />
      ),
      onConfirm: async () => {
        try {
          await deleteRelationship({
            issueId: issueId,
            issueRelatedId: issueRelated.id
          }).unwrap()
          toast.message(message.delete.success)
        } catch {
          toast.error(message.delete.failed)
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
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UpdateRelationship
