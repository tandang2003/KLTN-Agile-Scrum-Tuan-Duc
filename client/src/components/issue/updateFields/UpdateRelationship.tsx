import { useEffect, useMemo, useState } from 'react'

import { useAlertHost } from '@/components/AleartHost'
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
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
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
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
  const message = messages.component.issue.update.form.relationship
  const [form, setForm] = useState<Partial<CreateRelationshipIssueType>>({
    typeRelation: 'BLOCKS'
  })
  const { data: relationships, isLoading } = useGetRelationshipQuery(issueId)
  const [trigger, { data: issues }] = useLazyGetIssueAvailableQuery()
  const [createIssue] = useCreateRelationshipMutation()

  useEffect(() => {
    handleSubmit()
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
      <span className='text-lg'>{message.title}</span>
      <LoadingBoundary<RelationshipResponse[]>
        loading='Loading relationships...'
        fallback={message.fallback}
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
                    {getRelationshipDisplayName(value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <SelectIssueRelated
              issueId={issueId}
              typeRelation={form?.typeRelation as IssueRelationShip}
              onChange={(issueId) => {
                setForm((prev) => ({
                  ...prev,
                  issueRelatedId: issueId
                }))
              }}
            />

            {/* <Select
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
            </Select> */}
          </div>

          <div className='mt-3 flex justify-end gap-2'>
            <Button
              type='button'
              className='bg-red-500 text-white hover:cursor-pointer hover:opacity-60'
              onClick={() => cancel?.()}
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

type SelectIssueRelatedProps = {
  issueId?: Id
  typeRelation?: IssueRelationShip
  onChange?: (issueId: Id) => void
}

const SelectIssueRelated = ({
  issueId,
  onChange,
  typeRelation
}: SelectIssueRelatedProps) => {
  const [trigger, { data: issues }] = useLazyGetIssueAvailableQuery()
  const [open, setOpen] = useState(false)
  const [issueName, setIssueName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    if (!open) return
    if (!issueId || !typeRelation) return
    trigger({
      issueId: issueId,
      type: typeRelation as IssueRelationShip
    })
  }, [issueId, typeRelation, open, trigger])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {issueName
            ? issues?.find((framework) => framework.name === issueName)?.name
            : 'Chọn issue liên quan'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-full p-0'>
        <Command
          filter={(value, search) => {
            console.log(value, search)
            if (value.includes(search)) return 1
            return 0
          }}
        >
          <CommandInput
            className='h-9'
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder='Chọn issue liên quan'
          />
          <CommandList>
            <CommandEmpty>Không có issue</CommandEmpty>

            <CommandGroup>
              {issues?.map((issue) => (
                <CommandItem
                  key={issue.id}
                  value={issue.name}
                  onSelect={(currentValue) => {
                    setIssueName(currentValue === issueName ? '' : currentValue)
                    setOpen(false)
                    onChange?.(issue.id)
                  }}
                >
                  {issue.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      issueName === issue.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
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
            <span className='mt-4 mb-2 inline-block text-base'>
              {getRelationshipDisplayName(key as IssueRelationShip)}
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
  const { showAlert } = useAlertHost()
  const handleDelete = () => {
    showAlert({
      title: 'Delete relationship',
      type: 'warning',
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
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UpdateRelationship
