'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'

import { Room } from './room'
import { Editor } from './editor'
import { Navbar } from './navbar'
import { Toolbar } from './toolbar'
import { api } from 'db/_generated/api'

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.google_docs_documents.getById>
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument)

  return (
    <Room>
      <div className='min-h-screen bg-[#FAFBFD]'>
        <div className='fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-[#FAFBFD] px-4 pt-2 print:hidden'>
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className='pt-[114px] print:pt-0'>
          <Editor />
          {/* <Editor initialContent={document.initialContent} /> */}
        </div>
      </div>
    </Room>
  )
}
