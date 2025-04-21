import { WorkspaceParams } from '@/types/route.type'
import React from 'react'
import { useParams } from 'react-router-dom'

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams<WorkspaceParams>()
  if (!workspaceId) {
    return null
  }
  return <div>{workspaceId}</div>
}

export default WorkspaceDetailPage
