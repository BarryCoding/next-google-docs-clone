import { Editor } from './editor'
import { Ruler } from './ruler'
import { Toolbar } from './toolbar'

/** nextjs 15: dynamic routing */
interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}
export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = await params
  return (
    <div className='gb-[#FAFBFD] min-h-screen'>
      <p className='hidden'>documentId: {documentId}</p>
      <Toolbar />
      <Ruler />
      <Editor />
    </div>
  )
}
