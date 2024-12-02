## Project setup

[02:13](https://www.youtube.com/watch?v=gq2bbDmSokU&t=133s)

- [Next.js system requirement](https://nextjs.org/docs/app/getting-started/installation#system-requirements)

```zsh
node -v

npm -v

npx -v

npx create-next-app@15.0.3
# + name: google-docs
# + ts
# + eslint
# + tailwind
# + src
# + app router
# - turbopack
# - import

cd google-docs

code .
```

- setup [shadcn/ui](https://ui.shadcn.com/docs/installation/next)
- [next15 + react19rc](https://ui.shadcn.com/docs/react-19)

```zsh
# read version installed
npx shadcn@latest --version

# install inside nextjs project
npx shadcn@2.1.6 init
# + new york
# + neutral
# + css variable
# + --legacy-peer-deps
```

- install ui components

```zsh
npx shadcn@2.1.6 add --all
# + --legacy-peer-deps
```

- test ui Button in page

```zsh
npm install -D prettier prettier-plugin-tailwindcss eslint-config-prettier --legacy-peer-deps
```
## Project structure 

[28:44](https://www.youtube.com/watch?v=gq2bbDmSokU&t=1724s)  

- read [routing](https://nextjs.org/docs/app/building-your-application/routing)
  - page.tsx / layout.tsx
  - dynamic `[folderName]` / group `(folderName)`
  - Link component

## Tiptap editor

[46:49](https://www.youtube.com/watch?v=gq2bbDmSokU&t=2809s)

- editor.tsx

- [install tiptap with nextjs](https://tiptap.dev/docs/editor/getting-started/install/nextjs)
  - support react19 `--legacy-peer-deps` flag to remove error

```zsh
npm i @tiptap/react@2.10.2 @tiptap/pm@2.10.2 @tiptap/starter-kit@2.10.2 --legacy-peer-deps
```

- integration
  - [starter-kit](https://tiptap.dev/docs/editor/extensions/functionality/starterkit)
- style the editor and print mode

## Tiptap extensions

[01:02:28](https://www.youtube.com/watch?v=gq2bbDmSokU&t=3748s)  

- custom tiptap extensions style in global css
  - [styling](https://tiptap.dev/docs/editor/getting-started/style-editor)
- extensions and add styles
  - [heading](https://tiptap.dev/docs/editor/extensions/nodes/heading)
  - [bullet-list](https://tiptap.dev/docs/editor/extensions/nodes/bullet-list)
  - [+ task-list](https://tiptap.dev/docs/editor/extensions/nodes/task-list)
  - [+ table](https://tiptap.dev/docs/editor/extensions/nodes/table)
  - [+ image](https://tiptap.dev/docs/editor/extensions/nodes/image)
    - no [- ImageResize](https://www.npmjs.com/package/tiptap-extension-resize-image) non official extension

```zsh
npm i @tiptap/extension-task-list@2.10.2 @tiptap/extension-task-item@2.10.2 --legacy-peer-deps

npm i @tiptap/extension-table@2.10.2 @tiptap/extension-table-row@2.10.2 @tiptap/extension-table-header@2.10.2 @tiptap/extension-table-cell@2.10.2 --legacy-peer-deps

npm i @tiptap/extension-image@2.10.2 --legacy-peer-deps
```

## Editor store

[01:26:49](https://www.youtube.com/watch?v=gq2bbDmSokU&t=5209s)  

- toolbar.tsx
- [zustand](https://zustand-demo.pmnd.rs/)
  - use-editor-store.ts
- [tip-tap history](https://tiptap.dev/docs/collaboration/documents/history)

```zsh
npm i zustand@5.0.1 --legacy-peer-deps
```

## Editor tools

[01:44:38](https://www.youtube.com/watch?v=gq2bbDmSokU&t=6278s) 

- more Toolbar functions
  - redo | print | spellcheck(not working properly, lang problem?)
  - [Marks](https://tiptap.dev/docs/editor/extensions/marks) bold | italic | underline([install](https://tiptap.dev/docs/editor/extensions/marks/underline)) | remove format
  - comment | todo 

```zsh
npm i @tiptap/extension-underline@2.10.2 --legacy-peer-deps
```

## Font family & headings tools (day2)2

[01:58:18](https://www.youtube.com/watch?v=gq2bbDmSokU&t=7098s) 

- FontFamilyButton 
  - ui DropdownMenu
  - [font-family](https://tiptap.dev/docs/editor/extensions/functionality/fontfamily) 
  - with Mark [text-style](https://tiptap.dev/docs/editor/extensions/marks/text-style)
  - select the text to change font family

```zsh
npm i @tiptap/extension-text-style@2.10.2 @tiptap/extension-font-family@2.10.2 --legacy-peer-deps
```

- HeadingLevelButton
  - ui DropdownMenu
  - [heading](https://tiptap.dev/docs/editor/extensions/nodes/heading)
  - be consistent with global css h1 - h6

```zsh
npm i @tiptap/extension-heading@2.10.2 --legacy-peer-deps
```