import { Editor } from './editor'
import { Navbar } from './navbar'
import { Ruler } from './ruler'
import { Toolbar } from './toolbar'

/** nextjs 15: dynamic routing */
interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}
export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { documentId } = await params
  return (
    // <div className='gb-[#FAFBFD] min-h-screen'>
    //   <p className='hidden'>documentId: {documentId}</p>
    //   <Toolbar />
    //   <Ruler />
    //   <Editor />
    // </div>
    <div className='min-h-screen bg-[#FAFBFD]'>
      <p className='hidden'>documentId: {documentId}</p>
      <div className='fixed left-0 right-0 top-0 z-10 flex flex-col gap-y-2 bg-[#FAFBFD] px-4 pt-2 print:hidden'>
        <Navbar />
        <Toolbar />
      </div>
      <div className='pt-[114px] print:pt-0'>
        <Ruler />
        <Editor />
      </div>
    </div>
  )
}
