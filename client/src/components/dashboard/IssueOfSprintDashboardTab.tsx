import { useSprintDashboardDetailSheet } from '@/components/dashboard/SprintDashboardDetailSheet'

type IssueOfSprintDashboardTabProps = {}

const IssueOfSprintDashboardTab = ({}: IssueOfSprintDashboardTabProps) => {
  const {
    sprint: { id }
  } = useSprintDashboardDetailSheet()
  return <div></div>
}

export default IssueOfSprintDashboardTab
