type FileType =
  | 'image'
  | 'video'
  | 'pdf'
  | 'word'
  | 'excel'
  | 'powerpoint'
  | 'archive'
  | 'text'
  | 'file'
  | 'unknown'
  | 'xlsx'
const getFileTypeFromUrl = (url: string): FileType => {
  try {
    const pathname = new URL(url).pathname
    const extension = pathname.split('.').pop()?.toLowerCase()

    if (!extension) return 'unknown'

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
      return 'image'
    }
    if (['mp4', 'mov', 'avi', 'mkv'].includes(extension)) {
      return 'video'
    }
    if (['pdf'].includes(extension)) {
      return 'pdf'
    }
    if (['doc', 'docx'].includes(extension)) {
      return 'word'
    }
    if (['xls', 'xlsx'].includes(extension)) {
      return 'excel'
    }
    if (['ppt', 'pptx'].includes(extension)) {
      return 'powerpoint'
    }
    if (['zip', 'rar'].includes(extension)) {
      return 'archive'
    }
    if (['txt', 'md'].includes(extension)) {
      return 'text'
    }

    return 'file'
  } catch {
    return 'file'
  }
}
const getResourceTypeFromEx = (fileType: string): 'image' | 'video' | 'raw' => {
  if (fileType.startsWith('image/')) {
    return 'image'
  }
  if (fileType.startsWith('video/') || fileType.startsWith('audio/')) {
    return 'video'
  }
  return 'raw' // everything else is treated as 'raw' in Cloudinary
}

async function createFileFromUrl(url: string, filename: string): Promise<File> {
  const response = await fetch(url)
  const blob = await response.blob()

  return new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now()
  })
}
export { getFileTypeFromUrl, createFileFromUrl, getResourceTypeFromEx }
