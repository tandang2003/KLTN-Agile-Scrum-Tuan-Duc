import React from 'react'

type MessageProps = {
  template: string
  values: Record<string, React.ReactNode>
}

const Message = ({ template, values }: MessageProps) => {
  const parts = template.split(/({{.*?}})/g)

  return parts.map((part, index) => {
    const match = part.match(/{{(.*?)}}/)
    if (match) {
      const key = match[1]
      return <React.Fragment key={index}>{values[key]}</React.Fragment>
    }
    return <React.Fragment key={index}>{part}</React.Fragment>
  })
}
export default Message
