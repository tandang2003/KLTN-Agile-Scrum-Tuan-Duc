import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'
type ToolTipProps = {
  trigger: ReactNode
  children?: ReactNode
}

const ToolTip = ({ trigger, children }: ToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent align='start'>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ToolTip
