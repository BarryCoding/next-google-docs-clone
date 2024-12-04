import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { paginationOptsValidator } from 'convex/server'

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
  args: { paginationOpts: paginationOptsValidator },
  // args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
  handler: async (ctx, { paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')

    return await ctx.db.query(TABLE_DOCUMENTS).paginate(paginationOpts)

    // const organizationId = (user.organization_id ?? undefined) as string | undefined

    // Search within organization
    // if (search && organizationId) {
    //   return await ctx.db
    //     .query(TABLE_DOCUMENTS)
    //     .withSearchIndex('search_title', (q) =>
    //       q.search('title', search).eq('organizationId', organizationId),
    //     )
    //     .paginate(paginationOpts)
    // }

    // Personal search
    // if (search) {
    //   return await ctx.db
    //     .query('documents')
    //     .withSearchIndex('search_title', (q) =>
    //       q.search('title', search).eq('ownerId', user.subject),
    //     )
    //     .paginate(paginationOpts)
    // }

    // All docs inside organization
    // if (organizationId) {
    //   return await ctx.db
    //     .query('documents')
    //     .withIndex('by_organization_id', (q) => q.eq('organizationId', organizationId))
    //     .order('desc')
    //     .paginate(paginationOpts)
    // }

    // All personal docs
    //   return await ctx.db
    //     .query('documents')
    //     .withIndex('by_owner_id', (q) => q.eq('ownerId', user.subject))
    //     .order('desc')
    //     .paginate(paginationOpts)
  },
})

export const updateById = mutation({
  args: { id: v.id(TABLE_DOCUMENTS), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')

    const document = await ctx.db.get(args.id)
    if (!document) throw new ConvexError('Document not found')

    // const organizationId = (user.organization_id ?? undefined) as string | undefined
    // const isOwner = document.ownerId === user.subject
    // const isOrganizationMember = !!(
    //   document.organizationId && document.organizationId === organizationId
    // )

    // if (!isOwner && !isOrganizationMember) {
    //   throw new ConvexError('Unauthorized')
    // }

    return await ctx.db.patch(args.id, { title: args.title })
  },
})

export const removeById = mutation({
  args: { id: v.id(TABLE_DOCUMENTS) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new ConvexError('Unauthorized')

    const document = await ctx.db.get(args.id)
    if (!document) throw new ConvexError('Document not found')

    // const organizationId = (user.organization_id ?? undefined) as string | undefined
    // const isOwner = document.ownerId === user.subject
    // const isOrganizationMember = !!(
    //   document.organizationId && document.organizationId === organizationId
    // )

    // if (!isOwner && !isOrganizationMember) {
    //   throw new ConvexError('Unauthorized')
    // }

    return await ctx.db.delete(args.id)
  },
})