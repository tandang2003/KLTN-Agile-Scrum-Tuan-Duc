import {
  Icon as IconLib,
  IconifyIconHTMLElement,
  IconifyIconProps
} from '@iconify-icon/react'
import { forwardRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IconProps extends Omit<IconifyIconProps, 'ref'> {}

const Icon = forwardRef<IconifyIconHTMLElement, IconProps>(function Icon(
  { icon, size = 24, color = 'black', onClick, ...props },
  ref
) {
  return (
    <IconLib
      icon={icon}
      width={size}
      height={size}
      color={color}
      onClick={onClick}
      {...props}
      ref={ref}
    />
  )
})

export default Icon
