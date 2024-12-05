'use client'

import { ReactNode } from 'react'
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'

export function Room({ children }: { children: ReactNode }) {
  const params = useParams()
  return (
    <LiveblocksProvider
      publicApiKey={'pk_dev_G5nnfQ-4JjWs0i75RsMsXnLNq3HhySPVcXvsDEKHgU1eb7Zd3a3jNxxQckA8OF4q'}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
