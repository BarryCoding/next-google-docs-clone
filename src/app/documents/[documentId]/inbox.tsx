'use client'

import { BellIcon } from 'lucide-react'
import { ClientSideSuspense } from '@liveblocks/react'
import { useInboxNotifications } from '@liveblocks/react/suspense'
import { InboxNotification, InboxNotificationList } from '@liveblocks/react-ui'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export const Inbox = () => {
  return (
    <ClientSideSuspense fallback={<InboxFallback />}>
      <InboxMenu />
    </ClientSideSuspense>
  )
}

const InboxFallback = () => (
  <>
    <Button variant={'ghost'} disabled className='relative' size='icon'>
      <BellIcon className='size-5' />
    </Button>
    <Separator orientation='vertical' className='h-6' />
  </>
)

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative' size='icon'>
            <BellIcon className='size-5' />
            {inboxNotifications.length > 0 && (
              <span className='absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-sky-500 text-xs text-white'>
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-auto'>
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification) => (
                <InboxNotification
                  key={inboxNotification.id}
                  inboxNotification={inboxNotification}
                />
              ))}
            </InboxNotificationList>
          ) : (
            <div className='w-[400px] p-2 text-center text-sm text-muted-foreground'>
              No notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation='vertical' className='h-6' />
    </>
  )
}
