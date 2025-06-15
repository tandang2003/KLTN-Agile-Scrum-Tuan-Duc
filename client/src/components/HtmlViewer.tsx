import { forwardRef, ReactNode } from 'react'

type HtmlViewerProps = {
  value?: string
  fallback?: ReactNode
  className?: string
}

const HtmlViewer = forwardRef<HTMLDivElement, HtmlViewerProps>(
  ({ value = '', fallback = 'No content available', className }, ref) => {
    const hasContent = value.replace(/<\/?[^>]+(>|$)/g, '').trim().length > 0
    return hasContent ? (
      <div
        ref={ref}
        className={className}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    ) : (
      <p ref={ref} className={className}>
        {fallback}
      </p>
    )
  }
)

HtmlViewer.displayName = 'HtmlViewer'

export default HtmlViewer
