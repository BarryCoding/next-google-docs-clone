import { Editor } from './editor'

/** nextjs 15: dynamic routing */
interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}
export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = await params
  return (
    <div className='gb-[#FAFBFD] min-h-screen'>
      <p className='hidden'>documentId: {documentId}</p>
      <Editor />{' '}
    </div>
  )
}
