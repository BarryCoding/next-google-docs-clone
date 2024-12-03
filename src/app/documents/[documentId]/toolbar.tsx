'use client'

import { type Level } from '@tiptap/extension-heading'
import { type ColorResult, SwatchesPicker } from 'react-color'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
  BaselineIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ItalicIcon,
  Link2Icon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  UnderlineIcon,
  Undo2Icon,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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

const HeadingLevelButton = () => {
  const { editor } = useEditorStore()

  // TODO: consistent with global css heading font size
  const headings: { label: string; value: Level | 0; fontSize: string }[] = [
    { label: 'Paragraph', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
  ]

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`
      }
    }
    return 'Paragraph'
  }

  const setHeading = (level: Level | 0) => {
    if (level === 0) {
      editor?.chain().focus().setParagraph().run()
    } else {
      editor?.chain().focus().toggleHeading({ level }).run()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex h-7 w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
          <span className='truncate'>{getCurrentHeading()}</span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            onClick={() => setHeading(value)}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
              // BUG FIXED
              value === 0 && !editor?.isActive('heading') && 'bg-neutral-200/80',
              editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80',
            )}
          >
            {label} {value === 0 && !editor?.isActive('heading') ? '1' : '0'}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TextColorButton = () => {
  const { editor } = useEditorStore()

  const color = editor?.getAttributes('textStyle').color || '#000000'

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
          <BaselineIcon className='size-4' style={{ color: color }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SwatchesPicker color={color} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HighlightColorButton = () => {
  const { editor } = useEditorStore()
  const color = editor?.getAttributes('highlight').color || '#FFFFFFFF'

  const onChange = (color: ColorResult) => {
    console.log(`🔎 🔍 ~ onChange ~ color:`, color)
    editor?.commands.setHighlight({ color: color.hex })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
          <HighlighterIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SwatchesPicker color={color} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const LinkButton = () => {
  const { editor } = useEditorStore()
  const [href, setHref] = useState('')

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setHref('')
  }

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setHref(editor?.getAttributes('link').href || '')
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className='flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
          <Link2Icon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex items-center gap-x-2 p-2.5'>
        <Input
          placeholder='https://example.com'
          value={href}
          onChange={(e) => setHref(e.target.value)}
        />
        <Button onClick={() => onChange(href)}>Apply</Button>
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
      <HeadingLevelButton />

      <Separator orientation='vertical' className='h-6 bg-neutral-300' />

      <TextColorButton />
      <HighlightColorButton />
      {sections[1].map((item) => (
        <ToolbarIcon key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />

      <LinkButton />

      {sections[2].map((item) => (
        <ToolbarIcon key={item.label} {...item} />
      ))}
    </div>
  )
}
