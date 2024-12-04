'use client'

import { useState } from 'react'
// import { toast } from 'sonner'
import { useMutation } from 'convex/react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { api } from 'db/_generated/api'
import { Id } from 'db/_generated/dataModel'

interface RenameDialogProps {
  documentId: Id<'google_docs_documents'>
  initialTitle: string
  children: React.ReactNode
}

export const RenameDialog = ({ documentId, initialTitle, children }: RenameDialogProps) => {
  const update = useMutation(api.google_docs_documents.updateById)
  const [isUpdating, setIsUpdating] = useState(false)

  const [title, setTitle] = useState(initialTitle)
  const [open, setOpen] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)

    update({ id: documentId, title: title.trim() || 'Untitled' })
      // .catch(() => toast.error('Something went wrong'))
      // .then(() => toast.success('Document updated'))
      .finally(() => {
        setIsUpdating(false)
        setOpen(false)
      })
  }

  const handleClose = () => {
    setOpen(false)
    setTitle(initialTitle)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>Enter a new name for this document</DialogDescription>
          </DialogHeader>
          <div className='my-4'>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Document name'
            />
          </div>
          <DialogFooter>
            <Button type='button' variant='ghost' disabled={isUpdating} onClick={handleClose}>
              Cancel
            </Button>
            <Button type='submit' disabled={isUpdating}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
