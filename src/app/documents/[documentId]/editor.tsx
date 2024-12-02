'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      // style the editor
      attributes: {
        style: 'padding-left: 56px; padding-right: 56px', // padding will be dynamic
        class:
          'flex min-h-[1054px] w-[816px] cursor-text flex-col border border-[#c7c7c7] bg-white pb-10 pr-14 pt-10 focus:outline-none print:border-0',
      },
    },
    extensions: [StarterKit], // https://tiptap.dev/docs/editor/extensions/functionality/starterkit
    content: '<p>Hello World! 🌎️</p>',
  })
  return (
    // print style control with print:
    <div className='size-full overflow-x-auto bg-[#f9fbfd] px-4 print:overflow-visible print:bg-white print:p-0'>
      <div className='mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
