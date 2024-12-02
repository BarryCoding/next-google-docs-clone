'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  UnderlineIcon,
  Undo2Icon,
  type LucideIcon,
} from 'lucide-react'

// REFACTOR: SEPARATE buttons

/** select the paragraph to change, used with text-style */
const FontFamilyButton = () => {
  const { editor } = useEditorStore()

  const fonts = [
    { label: 'Arial', value: 'Arial' }, // the default
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex h-7 w-[120px] shrink-0 items-center justify-between overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
          <span className='truncate'>
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
              editor?.isActive('textStyle', { fontFamily: value }) && 'bg-neutral-200/80',
            )}
            style={{ fontFamily: value }}
          >
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
      <Icon className='size-4' />
    </button>
  )
}

export const Toolbar = () => {
  const { editor } = useEditorStore()

  const sections: IconProps[][] = [
    [
      { label: 'undo', icon: Undo2Icon, onClick: () => editor?.chain().focus().undo().run() },
      { label: 'redo', icon: Redo2Icon, onClick: () => editor?.chain().focus().redo().run() },
      { label: 'print', icon: PrinterIcon, onClick: () => window.print() },
      // spell check failed
    ],

    // tiptap Marks
    [
      {
        label: 'bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: 'italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: 'underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
      {
        label: 'remove format',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
    [
      {
        label: 'toggle task',
        icon: ListTodoIcon,
        isActive: editor?.isActive('taskList'),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: 'comment',
        icon: MessageSquarePlusIcon,
        onClick: () => {
          console.log('TODO: comment')
        },
      },
    ],
    // TODO: heading
    // TODO: font family | size | color | highlight color
    // TODO: link image content-align line-height list
  ]
  return (
    <div className='flex min-h-10 items-center gap-x-0.5 overflow-x-auto rounded-[24px] bg-[#f1f4f9] px-2.5 py-0.5'>
      {sections[0].map((item) => (
        <ToolbarIcon key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <FontFamilyButton />

      <Separator orientation='vertical' className='h-6 bg-neutral-300' />

      {sections[1].map((item) => (
        <ToolbarIcon key={item.label} {...item} />
      ))}

      <Separator orientation='vertical' className='h-6 bg-neutral-300' />

      {sections[2].map((item) => (
        <ToolbarIcon key={item.label} {...item} />
      ))}
    </div>
  )
}
