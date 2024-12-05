'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'
import { FullscreenLoader } from '@/components/fullscreen-loader'
import { toast } from 'sonner'
import { getUsers } from './actions'

type User = { id: string; name: string; avatar: string }

export function Room({ children }: { children: ReactNode }) {
  const params = useParams()

  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers()
        setUsers(list)
      } catch {
        toast.error('Failed to fetch users')
      }
    },
    [],
  )

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleResolveUser = ({ userIds }: { userIds: string[] }) => {
    return userIds.map((userId) => users.find((user) => user.id === userId) ?? undefined)
  }
  const handleResolveMentionSuggestions = ({ text }: { text: string }) => {
    // let filteredUsers = users
    // if (text) {
    //   filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
    // }

    // return filteredUsers.map((user) => user.id)
    return users
      .filter((user) => (text ? user.name.toLowerCase().includes(text.toLowerCase()) : user))
      .map((user) => user.id)
  }

  return (
    <LiveblocksProvider
      authEndpoint={'/api/liveblocks-auth'}
      resolveUsers={handleResolveUser}
      resolveMentionSuggestions={handleResolveMentionSuggestions}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullscreenLoader label='Room loading...' />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
