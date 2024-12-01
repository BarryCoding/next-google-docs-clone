import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <nav>
        Click&nbsp;
        <Link className='text-blue-400' href={'/documents/123'}>
          here
        </Link>
        &nbsp;to document 123
      </nav>
    </div>
  )
}
