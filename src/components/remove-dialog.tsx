'use client'

// import { toast } from 'sonner'
import { useState } from 'react'
import { useMutation } from 'convex/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { api } from '../../convex/_generated/api'
import { Id } from '../../convex/_generated/dataModel'
// import { useRouter } from 'next/navigation'

interface RemoveDialogProps {
  documentId: Id<'google_docs_documents'>
  children: React.ReactNode
}

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
  // const router = useRouter()
  const remove = useMutation(api.google_docs_documents.removeById)
  const [isRemoving, setIsRemoving] = useState(false)

  const deleteDocument = () => {
    setIsRemoving(true)
    remove({ id: documentId })
      // .catch(() => toast.error('Something went wrong'))
      .then(() => {
        // toast.success('Document removed')
        // router.push('/')
      })
      .finally(() => setIsRemoving(false))
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isRemoving} onClick={deleteDocument}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
