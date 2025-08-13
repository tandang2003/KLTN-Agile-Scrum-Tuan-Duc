import { useMemo } from 'react'

type Props = {
  filename: string
  url: string
  extension: String
}
const AttachmentView = ({ filename, url, extension }: Props) => {
  const icon = useMemo(() => {
    switch (extension.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return (
          <div className='rounded-md border-1 p-1 shadow-md'>
            <img
              src={url}
              alt={filename}
              loading='lazy'
              className='h-[80px] w-[120px] overflow-hidden object-cover'
            />
          </div>
        )

      case 'pdf':
        return <div>📄 PDF</div>

      case 'docx':
      case 'doc':
        return <div>📝 Word</div>

      case 'xlsx':
      case 'xls':
        return <div>📊 Excel</div>

      case 'ppt':
      case 'pptx':
        return <div>📽 PowerPoint</div>

      default:
        return <div>📁 File</div>
    }
  }, [url, extension, filename])

  return icon
}

export default AttachmentView
