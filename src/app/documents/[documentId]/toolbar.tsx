'use client'
import { cn } from '@/lib/utils'
import { Undo2Icon, type LucideIcon } from 'lucide-react'

interface IconProps {
  label: string
  onClick?: () => void
  isActive?: boolean
  icon: LucideIcon
}

const ToolbarIcon = ({ onClick, isActive, icon: Icon }: IconProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80',
      )}
    >
      <Icon />
    </button>
  )
}

export const Toolbar = () => {
  const sections: IconProps[][] = [[{ label: 'undo', icon: Undo2Icon, onClick: () => {} }]]
  return (
    <div className='flex min-h-10 items-center gap-x-0.5 overflow-x-auto rounded-[24px] bg-[#f1f4f9] px-2.5 py-0.5'>
      {sections[0].map((item) => (
        <ToolbarIcon key={item.label} {...item} />
      ))}
    </div>
  )
}
