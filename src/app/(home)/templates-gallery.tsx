'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useMutation } from 'convex/react'
import { templates } from '@/constants/templates'
import { api } from 'db/_generated/api'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const TemplatesGallery = () => {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const createDocument = useMutation(api.google_docs_documents.create)

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true)
    createDocument({ title, initialContent })
      .then((documentId) => {
        toast.success('Document created')
        router.push(`/documents/${documentId}`)
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => {
        setIsCreating(false)
      })
  }

  return (
    <div className='bg-[#F1F3F4]'>
      <div className='mx-auto flex max-w-screen-xl flex-col gap-y-4 px-16 py-6'>
        <h3 className='font-medium'>Start a new document</h3>
        <Carousel>
          <CarouselContent className='-ml-4'>
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className='basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6'
              >
                <div
                  className={cn(
                    'flex aspect-[3/4] flex-col gap-y-2.5',
                    isCreating && 'pointer-events-none opacity-50',
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => onTemplateClick(template.label, template.initialContent)}
                    style={{ backgroundImage: `url(${template.imageUrl})` }}
                    className='flex size-full flex-col items-center justify-center gap-y-4 rounded-sm border bg-white bg-cover bg-center bg-no-repeat transition hover:border-blue-500 hover:bg-blue-50'
                  />
                  <p className='truncate text-sm font-medium'>{template.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
