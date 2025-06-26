import Icon from '@/components/Icon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useUploadFile from '@/hooks/use-upload-file'
import resourceService from '@/services/resource.service'
import { UserLayoutContextType } from '@/types/route.type'
import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
type UserAvatarProps = {}

const UserAvatar = ({}: UserAvatarProps) => {
  const { user } = useOutletContext<UserLayoutContextType>()
  const ref = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [avatar, setAvatar] = useState<string | undefined>(
    user.avatar ?? undefined
  )

  const { data } = useUploadFile({
    file,
    callback: async (res) => {
      const { bytes, format, public_id } = res
      return resourceService.createResourceAvatar({
        contentType: 'IMAGE',
        extension: format,
        name: file?.name || '',
        size: bytes,
        publicId: public_id
      })
    }
  })

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFile(file)
  }

  const handleClick = () => {
    if (!ref.current) return
    ref.current.click()
  }

  useEffect(() => {
    if (!data) return
    setAvatar(data.url)
  }, [data])

  return (
    <Avatar className='group relative mx-auto size-[200px]'>
      <AvatarImage
        src={avatar}
        className='group hover:[&>span]:opacity-100 hover:[&>span]:transition-opacity hover:[&>span]:duration-300'
      />
      <span
        className='absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100'
        onClick={handleClick}
      >
        <Icon
          icon={'material-symbols:camera'}
          size={40}
          className='absolute top-1/2 left-1/2 z-10 -translate-1/2 text-white'
        />
      </span>

      <AvatarFallback
        onClick={handleClick}
        className='active-bg border-2 hover:cursor-pointer'
      >
        <Icon
          icon={'material-symbols:camera'}
          size={40}
          className='text-white'
        />
      </AvatarFallback>
      <input
        type='file'
        ref={ref}
        multiple={false}
        onChange={handleUploadFile}
        hidden
      />
    </Avatar>
  )
}

export default UserAvatar
