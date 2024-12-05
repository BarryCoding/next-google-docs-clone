import { Liveblocks } from '@liveblocks/node'
import { ConvexHttpClient } from 'convex/browser'
import { auth, currentUser } from '@clerk/nextjs/server'

import { api } from 'db/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

// FIXME: how to deal with errors!!!
export async function POST(req: Request) {
  const { sessionClaims } = await auth()
  if (!sessionClaims)
    throw new Error('Unauthorized sessionClaims', { cause: 'cause by sessionClaims' })

  const user = await currentUser()
  if (!user) throw new Error('Unauthorized user', { cause: 'cause by user' })

  const { room } = await req.json() // room is same as the document id
  const document = await convex.query(api.google_docs_documents.getById, { id: room })
  if (!document) throw new Error('Unauthorized document', { cause: 'cause by document' })

  const isOwner = document.ownerId === user.id
  const isOrganizationMember = !!(
    // (warning) document.organizationId & sessionClaims.org_id BOTH CAN BE undefined
    (document.organizationId && document.organizationId === sessionClaims.org_id)
  )
  if (!isOwner && !isOrganizationMember)
    throw new Error('Unauthorized isOrganizationMember', { cause: 'cause by isOrganizationMember' })

  const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous'
  const nameToNumber = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = Math.abs(nameToNumber) % 360
  const color = `hsl(${hue}, 80%, 60%)`

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  })
  session.allow(room, session.FULL_ACCESS)
  const { body, status } = await session.authorize()

  return new Response(body, { status })
}
