'use client'

import { Navbar } from './navbar'
import { TemplatesGallery } from './templates-gallery'

import { api } from 'db/_generated/api'
import { usePaginatedQuery } from 'convex/react'
import { DocumentsTable } from './document-table'
import { useSearchParam } from '@/hooks/use-search-param'

export default function Home() {
  const [search] = useSearchParam()

  // REFACTOR: move it to table component
  const { results, loadMore, status } = usePaginatedQuery(
    api.google_docs_documents.get,
    { search },
    { initialNumItems: 5 },
  )
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='fixed left-0 right-0 top-0 z-10 h-16 bg-white p-4'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
        <DocumentsTable documents={results} loadMore={loadMore} status={status} />
      </div>
    </div>
  )
}
