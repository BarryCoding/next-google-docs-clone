import Link from 'next/link'
import Image from 'next/image'

import { Search } from './search'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

export const Navbar = () => {
  return (
    <nav className='flex h-full w-full items-center justify-between'>
      <div className='flex shrink-0 items-center gap-3 pr-6'>
        <Link href='/'>
          <Image src='/logo.svg' alt='Logo' width={36} height={36} />
        </Link>
        <h3 className='text-xl'>Docs</h3>
      </div>
      <Search />
      <div className='flex items-center gap-3 pl-6'>
        <OrganizationSwitcher
          afterCreateOrganizationUrl='/'
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl='/'
          afterSelectPersonalUrl='/'
        />
        <UserButton />
      </div>
    </nav>
  )
}
