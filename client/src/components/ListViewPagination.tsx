import ListView, { ListViewProps } from '@/components/ListView'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Page } from '@/types/http.type'

type ListViewPaginationProps<T> = {
  view: Omit<ListViewProps<T>, 'data'>
  page?: Page<T>
  minHeight?: string
  onPageChange?: (page: number) => void
}

const ListViewPagination = <T,>({
  view,
  page,
  onPageChange,
  minHeight
}: ListViewPaginationProps<T>) => {
  const totalPages = page?.totalPages || 1
  const currentPage = page?.currentPage || 0 // 0-based
  const data = page?.items || []

  const paginationRange = getPaginationRange(totalPages, currentPage + 1)

  return (
    <>
      <ScrollArea>
        <ListView<T> style={{ minHeight: minHeight }} data={data} {...view} />
        <ScrollBar />
      </ScrollArea>
      {totalPages > 1 && (
        <Pagination className='mt-4'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (onPageChange && currentPage > 0) {
                    onPageChange(currentPage - 1)
                  }
                }}
                aria-disabled={currentPage === 0}
              />
            </PaginationItem>

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
                    onClick={() => onPageChange?.(pageNum - 1)} // Subtract 1 for backend
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (onPageChange && currentPage + 1 < totalPages) {
                    onPageChange(currentPage + 1)
                  }
                }}
                aria-disabled={currentPage + 1 >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
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
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1

  const pages: (number | 'dots')[] = []

  pages.push(1)

  if (shouldShowLeftDots) {
    pages.push('dots')
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    pages.push(i)
  }

  if (shouldShowRightDots) {
    pages.push('dots')
  }

  pages.push(totalPages)

  return pages
}

export default ListViewPagination
