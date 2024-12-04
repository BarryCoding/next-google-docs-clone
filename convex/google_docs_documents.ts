import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

const TABLE_DOCUMENTS = 'google_docs_documents'

export const create = mutation({
  args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')

    // const organizationId = (user.organization_id ?? undefined) as string | undefined

    return await ctx.db.insert(TABLE_DOCUMENTS, {
      title: args.title ?? 'Untitled Document',
      ownerId: user.subject,
      // organizationId,
      initialContent: args.initialContent,
    })
  },
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('google_docs_documents').collect()
  },
})
