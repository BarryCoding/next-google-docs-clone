import { auth } from '@clerk/nextjs/server'
import { preloadQuery } from 'convex/nextjs'

import { Document } from './document'
import { api } from 'db/_generated/api'
import { Id } from 'db/_generated/dataModel'

interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<'google_docs_documents'> }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params

  const { getToken } = await auth()
  const token = (await getToken({ template: 'convex' })) ?? undefined
  if (!token) throw new Error('Unauthorized')

  const preloadedDocument = await preloadQuery(
    api.google_docs_documents.getById,
    { id: documentId },
    { token },
  )

  return <Document preloadedDocument={preloadedDocument} />
}

export default DocumentIdPage
