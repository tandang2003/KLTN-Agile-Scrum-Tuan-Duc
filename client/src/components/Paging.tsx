import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Page } from '@/types/http.type'

type Props = {
  onPageChange?: (page: number) => void
  page: Omit<Page<void>, 'items'>
}

const Paging = ({ onPageChange, page }: Props) => {
  const totalPages = page.totalPages || 1
  const currentPage = page.currentPage || 0

  const isFirstPage = currentPage === 0
  const isLastPage = currentPage >= totalPages - 1

  const paginationRange = getPaginationRange(totalPages, currentPage + 1)
  console.log(paginationRange)
  return (
    <Pagination className='mt-4'>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={isFirstPage}
            className={isFirstPage ? 'pointer-events-none opacity-50' : ''}
            onClick={() => {
              if (!isFirstPage && onPageChange) {
                onPageChange(currentPage - 1)
              }
            }}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {paginationRange.map((pageNum, index) => {
          if (pageNum === 'dots') {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={pageNum - 1 === currentPage}
                onClick={() => onPageChange?.(pageNum - 1)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            aria-disabled={isLastPage}
            className={isLastPage ? 'pointer-events-none opacity-50' : ''}
            onClick={() => {
              if (!isLastPage && onPageChange) {
                onPageChange(currentPage + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
const getPaginationRange = (
  totalPages: number,
  currentPage: number,
  siblingCount: number = 1
): (number | 'dots')[] => {
  const totalPageNumbers = siblingCount * 2 + 5

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2

  const pages: (number | 'dots')[] = []

  // Always show first page
  pages.push(1)

  // Show left dots
  if (shouldShowLeftDots) {
    pages.push('dots')
  }

  // Middle range
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    if (i !== 1 && i !== totalPages) {
      pages.push(i)
    }
  }

  // Show right dots
  if (shouldShowRightDots) {
    pages.push('dots')
  }

  // Always show last page
  if (totalPages !== 1) {
    pages.push(totalPages)
  }

  return pages
}

export default Paging
