import Link from 'next/link'
import { Navbar } from './navbar'
import { TemplatesGallery } from './templates-gallery'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='fixed left-0 right-0 top-0 z-10 h-16 bg-white p-4'>
        <Navbar />
        Click&nbsp;
        <Link className='text-blue-400' href={'/documents/123'}>
          here
        </Link>
        &nbsp;to document 123
      </div>
      <div className='mt-16'>
        <TemplatesGallery />
      </div>
    </div>
  )
}
