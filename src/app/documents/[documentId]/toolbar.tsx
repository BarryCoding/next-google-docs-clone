'use client'

import { type Level } from '@tiptap/extension-heading'
import { type ColorResult, SwatchesPicker } from 'react-color'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor-store'
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BaselineIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
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
          <DropdownMenuItem
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
              editor?.isActive('textStyle', { fontFamily: value }) && 'bg-accent',
            )}
            style={{ fontFamily: value }}
          >
            <span className='text-sm'>{label}</span>
          </DropdownMenuItem>
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

// TODO: close after submit
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

// TODO: close after submit
const ImageButton = () => {
  const { editor } = useEditorStore()
  const [imageUrl, setImageUrl] = useState('')

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run()
  }

  const onUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        onChange(imageUrl)
      }
    }

    input.click()
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl)
      setImageUrl('')
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
            <ImageIcon className='size-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='flex flex-col gap-y-2.5 p-2.5'>
          <div className='flex items-center gap-x-2'>
            <Input
              placeholder='Input image URL'
              onChange={(e) => setImageUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleImageUrlSubmit()
                }
              }}
            />
            <Button onClick={handleImageUrlSubmit}>Apply</Button>
          </div>

          <Button className='flex w-full items-center gap-x-2' onClick={onUpload}>
            <UploadIcon className='mr-2 size-4' />
            Upload Image
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

const AlignButton = () => {
  const { editor } = useEditorStore()

  const alignments = [
    {
      label: 'Align Left',
      value: 'left',
      icon: AlignLeftIcon,
    },
    {
      label: 'Align Center',
      value: 'center',
      icon: AlignCenterIcon,
    },
    {
      label: 'Align Right',
      value: 'right',
      icon: AlignRightIcon,
    },
    {
      label: 'Align Justify',
      value: 'justify',
      icon: AlignJustifyIcon,
    },
  ]

  if (!editor?.isActive('heading') && !editor?.isActive('paragraph')) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
          {alignments.map(
            ({ value, icon: Icon }) =>
              editor?.isActive({ textAlign: value }) && <Icon key={value} className='size-4' />,
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-accent',
              editor?.isActive({ textAlign: value }) && 'bg-accent',
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ListButton = () => {
  const { editor } = useEditorStore()

  const lists = [
    {
      label: 'Bullet List',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: 'Ordered List',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ]

  if (!editor?.isActive('bulletList') && !editor?.isActive('orderedList')) {
    return null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
          {editor?.isActive('bulletList') && <ListIcon className='size-4' />}
          {editor?.isActive('orderedList') && <ListOrderedIcon className='size-4' />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
        {lists.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-accent',
              isActive() && 'bg-accent',
            )}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// FIXME: ugly and there is a bug when text switch,
// REFACTOR: use Select or other ui components
const FontSizeButton = () => {
  const { editor } = useEditorStore()

  const currentFontSize = editor?.getAttributes('textStyle').fontSize
    ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
    : '16'

  const [fontSize, setFontSize] = useState(currentFontSize)
  const [inputValue, setInputValue] = useState(fontSize)
  const [isEditing, setIsEditing] = useState(false)

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize)
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run()
      setFontSize(newSize)
      setInputValue(newSize)
      setIsEditing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    updateFontSize(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      updateFontSize(inputValue)
      editor?.commands.focus()
    }
  }

  const increment = () => {
    const newSize = parseInt(fontSize) + 1
    updateFontSize(newSize.toString())
  }

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1
    if (newSize > 0) {
      updateFontSize(newSize.toString())
    }
  }

  return (
    <div className='flex items-center gap-x-0.5'>
      <button
        onClick={decrement}
        className='flex h-7 w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/80'
      >
        <MinusIcon className='size-4' />
      </button>
      {isEditing ? (
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className='h-7 w-10 rounded-sm border border-neutral-400 bg-transparent text-center text-sm focus:outline-none focus:ring-0'
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true)
            setFontSize(currentFontSize)
          }}
          className='h-7 w-10 rounded-sm border border-neutral-400 text-center text-sm hover:bg-neutral-200/80'
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className='flex h-7 w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/80'
      >
        <PlusIcon className='size-4' />
      </button>
    </div>
  )
}

const LineHeightButton = () => {
  const { editor } = useEditorStore()

  const lineHeights = [
    { label: 'Default', value: 'normal' },
    { label: 'Single', value: '1' },
    { label: '1.15', value: '1.15' },
    { label: '1.5', value: '1.5' },
    { label: 'Double', value: '2' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex h-7 min-w-7 shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80'>
          <ListCollapseIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='flex flex-col gap-y-1 p-1'>
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-accent',
              editor?.getAttributes('paragraph').lineHeight === value && 'bg-accent',
            )}
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
        label: 'strike',
        icon: StrikethroughIcon,
        isActive: editor?.isActive('strike'),
        onClick: () => editor?.chain().focus().toggleStrike().run(),
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
        isActive: editor?.isActive('liveblocksCommentMark'),
        onClick: () => editor?.chain().focus().addPendingComment().run(),
      },
    ],
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
      <FontSizeButton />
      <LineHeightButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <TextColorButton />
      <HighlightColorButton />
      {sections[1].map((item) => (
        <ToolbarIcon key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <ListButton />

      {sections[2].map((item) => (
        <ToolbarIcon key={item.label} {...item} />
      ))}
    </div>
  )
}
