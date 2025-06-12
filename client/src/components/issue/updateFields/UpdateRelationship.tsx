import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { IssueRelationShip } from '@/types/model/typeOf'
import { Input } from '@/components/ui/input'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  CreateRelationshipIssueSchema,
  CreateRelationshipIssueType
} from '@/types/relationship.type'
import issueService from '@/services/issue.service'
import { toast } from 'sonner'
import { Id } from '@/types/other.type'
import { useGetListIssueQuery } from '@/feature/issue/issue.api'
import useAppId from '@/hooks/use-app-id'
import useBoard from '@/hooks/use-board'
type UpdateRelationshipProps = {
  issueId: string
}

const UpdateRelationship = ({ issueId }: UpdateRelationshipProps) => {
  const [data, setData] = useState<Partial<CreateRelationshipIssueType>>()
  const { projectId } = useAppId()
  const { sprint } = useBoard()
  console.log('🚀 ~ BoardPage ~ projectId:', projectId, 'sprint:', sprint)

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
    const daParser = CreateRelationshipIssueSchema.safeParse(data)
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
        toast.message('Create relationship success')
      })
  }

  return (
    <div>
      <div className='flex gap-2'>
        <Select
          value={data?.typeRelation}
          onValueChange={(value) => {
            setData((prev) => ({
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
          value={data?.issueRelatedId}
          onValueChange={(value) => {
            setData((prev) => ({
              ...prev,
              issueRelatedId: value as Id
            }))
          }}
        >
          <SelectTrigger className='w-[180px]'>
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
      <div className='mt-3 flex justify-end'>
        <Button type='button' onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  )
}

export default UpdateRelationship
