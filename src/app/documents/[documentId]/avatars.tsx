'use client'

import { ClientSideSuspense } from '@liveblocks/react'
import { useOthers, useSelf } from '@liveblocks/react/suspense'
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Separator } from '@/components/ui/separator'

const AVATAR_SIZE = 36

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  )
}

const AvatarStack = () => {
  const others = useOthers()
  const currentUser = useSelf()

  if (others.length === 0) return null

  return (
    <>
      <div className='flex items-center'>
        {currentUser && (
          <div className='relative ml-2'>
            <Avatar src={currentUser.info.avatar} name='You' />
          </div>
        )}
        <div className='flex'>
          {others.map(({ connectionId, info }) => {
            return <Avatar key={connectionId} src={info.avatar} name={info.name} />
          })}
        </div>
      </div>
      <Separator orientation='vertical' className='h-6' />
    </>
  )
}

interface AvatarProps {
  src: string
  name: string
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <div
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
      className='group relative -ml-2 flex shrink-0 place-content-center rounded-full border-4 border-white bg-gray-400'
    >
      <div className='absolute top-full z-10 mt-2.5 whitespace-nowrap rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100'>
        {name}
      </div>
      <AvatarUI className='h-7 w-7'>
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
      </AvatarUI>
    </div>
  )
}
