'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from 'db/_generated/api'
import type { Id } from 'db/_generated/dataModel'

export async function getUsers() {
  const { sessionClaims } = await auth()
  const clerk = await clerkClient()

  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  })

  const users = response.data.map((user) => ({
    id: user.id,
    name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
    avatar: user.imageUrl,
  }))

  return users
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function getDocuments(ids: Id<'google_docs_documents'>[]) {
  return await convex.query(api.google_docs_documents.getByIds, { ids })
}