import { Id } from 'db/_generated/dataModel'
import { BsCloudCheck } from 'react-icons/bs'
interface DocumentInputProps {
  title: string
  id: Id<'google_docs_documents'>
}
export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  console.log(`🔎 🔍 ~ DocumentInput ~ id:`, id)
  return (
    <div className='flex items-center gap-2'>
      <span className='cursor-pointer truncate px-1.5 text-lg'>{title}</span>
      <BsCloudCheck className='size-4' />
    </div>
  )
}
