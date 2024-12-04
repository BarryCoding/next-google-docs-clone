import { LoaderIcon } from 'lucide-react'
import { PaginationStatus } from 'convex/react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Doc, Id } from 'db/_generated/dataModel'

import { format } from 'date-fns'
import { SiGoogledocs } from 'react-icons/si'
import { Building2Icon, CircleUserIcon } from 'lucide-react'
import Link from 'next/link'

import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { RenameDialog } from '@/components/rename-dialog'
import { RemoveDialog } from '@/components/remove-dialog'

interface DocumentsTableProps {
  documents: Doc<'google_docs_documents'>[] | undefined
  loadMore: (numItems: number) => void
  status: PaginationStatus
}

export const DocumentsTable = ({ documents, loadMore, status }: DocumentsTableProps) => {
  return (
    <div className='mx-auto flex max-w-screen-xl flex-col gap-5 px-16 py-6'>
      {documents === undefined && (
        <div className='flex h-24 items-center justify-center'>
          <LoaderIcon className='size-5 animate-spin text-muted-foreground' />
        </div>
      )}
      {!!documents && (
        <Table>
          <TableHeader>
            <TableRow className='border-none hover:bg-transparent'>
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className='hidden md:table-cell'>Shared</TableHead>
              <TableHead className='hidden md:table-cell'>Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 && (
            <TableBody>
              <TableRow className='hover:bg-transparent'>
                <TableCell colSpan={4} className='h-24 text-center text-muted-foreground'>
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {documents.length !== 0 && (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className='flex items-center justify-center'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => loadMore(5)}
          disabled={status !== 'CanLoadMore'}
        >
          {status === 'CanLoadMore' ? 'Load more' : 'End of results'}
        </Button>
      </div>
    </div>
  )
}

interface DocumentRowProps {
  document: Doc<'google_docs_documents'>
}

const DocumentRow = ({ document }: DocumentRowProps) => {
  return (
    <TableRow>
      <TableCell className='w-[50px]'>
        <SiGoogledocs className='size-6 fill-blue-500' />
      </TableCell>
      <TableCell className='font-medium md:w-[45%]'>
        <Link href={`/documents/${document._id}`} className='hover:text-primary'>
          {document.title}
        </Link>
      </TableCell>
      <TableCell className='hidden items-center gap-2 text-muted-foreground md:flex'>
        {document.organizationId && <Building2Icon className='size-4' />}
        {!document.organizationId && <CircleUserIcon className='size-4' />}
        {document.organizationId ? 'Organization' : 'Personal'}
      </TableCell>
      <TableCell className='hidden text-muted-foreground md:table-cell'>
        {format(new Date(document._creationTime), 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className='flex justify-end'>
        <DocumentMenu documentId={document._id} title={document.title} />
      </TableCell>
    </TableRow>
  )
}

interface DocumentMenuProps {
  documentId: Id<'google_docs_documents'>
  title: string
}

export const DocumentMenu = ({ documentId, title }: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => window.open(`/documents/${documentId}`, '_blank')}>
          <ExternalLinkIcon className='mr-2 size-4' />
          Open in a new tab
        </DropdownMenuItem>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            // onClick={(e) => e.stopPropagation()}
          >
            <FilePenIcon className='mr-2 size-4' />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            // onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon className='mr-2 size-4' />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
