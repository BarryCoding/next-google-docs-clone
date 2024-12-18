'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { useLiveblocksExtension } from '@liveblocks/react-tiptap'

import { useEditorStore } from '@/store/use-editor-store'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
import { Threads } from './threads'
import { Ruler } from './ruler'
import { useStorage } from '@liveblocks/react'
import { DEFAULT_MARGIN } from '@/constants/editor'

interface EditorProps {
  initialContent?: string | undefined
}

export const Editor = ({ initialContent }: EditorProps) => {
  const LiveblocksExtension = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  })
  const leftMargin = useStorage((root) => root.leftMargin) ?? DEFAULT_MARGIN
  const rightMargin = useStorage((root) => root.rightMargin) ?? DEFAULT_MARGIN

  const { setEditor } = useEditorStore()

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor)
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate(props) {
      setEditor(props.editor)
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor)
    },
    onTransaction({ editor }) {
      setEditor(editor)
    },
    onFocus({ editor }) {
      setEditor(editor)
    },
    onBlur({ editor }) {
      setEditor(editor)
    },
    onContentError({ editor }) {
      setEditor(editor)
    },
    editorProps: {
      // style the editor
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
        class:
          'flex min-h-[1054px] w-[816px] cursor-text flex-col border border-[#c7c7c7] bg-white pb-10 pr-14 pt-10 focus:outline-none print:border-0',
      },
    },
    extensions: [
      LiveblocksExtension,
      StarterKit.configure({ history: false }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        defaultProtocol: 'https',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ['heading', 'paragraph'],
        defaultLineHeight: 'normal',
      }),
    ],
  })
  return (
    // print style control with print:
    <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:overflow-visible print:bg-white print:p-0'>
      <Ruler />
      <div className='mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0'>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  )
}
