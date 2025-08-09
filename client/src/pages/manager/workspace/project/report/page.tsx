import SprintDataTable from '@/components/datatable/sprint/SprintDataTable'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type ReportPageProps = {}

const ReportPage = ({}: ReportPageProps) => {
  return (
    <div>
      <div className='mb-2 flex'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='ml-auto'>Mẫu báo cáo</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem asChild>
              <a
                href='/report/daily.xlsx'
                className='hover-opacity'
                download='daily.xlsx'
              >
                File báo cáo daily
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href='/report/sprint_backlog.xlsx'
                download='sprint_backlog.xlsx'
                className='hover-opacity'
              >
                File báo cáo Sprint Backlog
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <SprintDataTable />
    </div>
  )
}

export default ReportPage
