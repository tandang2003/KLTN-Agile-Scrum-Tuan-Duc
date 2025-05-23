import { Icon as IconLib, IconifyIconProps } from '@iconify-icon/react'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IconProps extends Omit<IconifyIconProps, 'ref'> {}

export default function Icon({
  icon,
  size = 24,
  color = 'black',
  onClick = undefined,
  ...props
}: IconProps) {
  return (
    <IconLib
      icon={icon}
      width={size}
      height={size}
      color={color}
      {...props}
      onClick={onClick}
    />
  )
}
