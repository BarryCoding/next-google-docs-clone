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

## Font family & headings tools

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

## Color tools (text & highlight)

[02:19:05](https://www.youtube.com/watch?v=gq2bbDmSokU&t=8345s) 

- TextColorButton
  - [react-color](https://casesandberg.github.io/react-color/)
  - [Functionality Color](https://tiptap.dev/docs/editor/extensions/functionality/color)
- TextHighlightButton 
  - [Marks Highlight](https://tiptap.dev/docs/editor/extensions/marks/highlight)
    - configure multicolor

```zsh
npm i react-color@2.19.3 --legacy-peer-deps
npm i --save-dev @types/react-color@3.0.12  --legacy-peer-deps

npm i @tiptap/extension-color@2.10.2 --legacy-peer-deps
npm i @tiptap/extension-highlight@2.10.2 --legacy-peer-deps
```

## Link and image tools

[02:33:26](https://www.youtube.com/watch?v=gq2bbDmSokU&t=9206s) 

- LinkButton
  - [Link](https://tiptap.dev/docs/editor/extensions/marks/link)
  - configure & global css

```zsh
npm i @tiptap/extension-link@2.10.2 --legacy-peer-deps
```

- ImageButton
  - input file hidden

## Align and list tools

[02:51:23](https://www.youtube.com/watch?v=gq2bbDmSokU&t=10283s) 

- AlignButton
  - [text-align](https://tiptap.dev/docs/editor/extensions/functionality/textalign)
    - configure

```zsh
npm i @tiptap/extension-text-align@2.10.2 --legacy-peer-deps
```

- ListButton
  - [bullet-list](https://tiptap.dev/docs/editor/extensions/nodes/bullet-list)
  - [ordered-list](https://tiptap.dev/docs/editor/extensions/nodes/ordered-list)

## Font size tool (custom extension)

[03:00:03](https://www.youtube.com/watch?v=gq2bbDmSokU&t=10803s) 

- [new extension](https://tiptap.dev/docs/editor/extensions/custom-extensions/create-new)
  - [example](https://github.com/ueberdosis/tiptap/blob/main/packages/extension-text-align/src/text-align.ts)
- font-size.ts
- FontSizeButton

## Line height tool (custom extension)

[03:19:40](https://www.youtube.com/watch?v=gq2bbDmSokU&t=11980s) 

- line-height.ts
- LineHeightButton
- recommend cursor ai-editor

## Margin ruler component

[03:32:55](https://www.youtube.com/watch?v=gq2bbDmSokU&t=12775s) 

- ruler.tsx
  - Ruler 
    - more accurate!
  - Marker

## Navigation bar component

[03:59:42](https://www.youtube.com/watch?v=gq2bbDmSokU&t=14382s) 

- public/logo.svg
- navbar.tsx
  - document-input.tsx

```zsh
npm i react-icons@5.3.0 --legacy-peer-deps
```

## Navigation bar tools

[04:23:57](https://www.youtube.com/watch?v=gq2bbDmSokU&t=15837s) 

- bad save functionalities

## Search input component

[04:35:01](https://www.youtube.com/watch?v=gq2bbDmSokU&t=16501s) 

update project structure:

- root layout.tsx 
  - font: Inter
  - [nuqs](https://nuqs.47ng.com/) -> layout.tsx

```zsh
npm i nuqs@2.2.3 --legacy-peer-deps
```

- page.tsx -> (home)/page.tsx(update css and Navbar)
  - (home)/navbar.tsx(SearchInput)
  - (home)/search-input.tsx(useSearchParam)
  - hooks/use-search-param.ts

## Template gallery component

[05:00:54](https://www.youtube.com/watch?v=gq2bbDmSokU&t=18054s) 

- templates-gallery.tsx
- constants/templates.ts
- public/templates/xxx.svg

## Database setup (Convex)

[05:16:25](https://www.youtube.com/watch?v=gq2bbDmSokU&t=18985s) 

- [login to convex](https://dashboard.convex.dev/t/barrycoding/antonio/keen-meadowlark-744/data)
  - new projectName `antonio`
  - script `"convex": "convex dev"`
- [convex docs](https://docs.convex.dev/quickstart/nextjs)

```zsh
npm install convex@1.17.3 --legacy-peer-deps

npx convex dev
# login to convex?
# an existing project
# 'antonio'

# after add the script to package.json
npm run convex
```

- context/convex-client-provider.tsx (paste)
- update root layout.tsx (convex)

- [schema](https://docs.convex.dev/database/schemas)
- convex/schema.ts 
  - defineTable
  - [index](https://docs.convex.dev/database/indexes/)
- convex/documents.ts
  - query `get`
- (home)/page.tsx 
  - useQuery

## Authentication setup (Clerk)

- TODO: Next.js + Convex + Clerk Diagram

[05:33:29](https://www.youtube.com/watch?v=gq2bbDmSokU&t=20009s) 

- [Convex + Clerk](https://docs.convex.dev/auth/clerk) + [Next.js + Clerk](https://clerk.com/docs/quickstarts/nextjs)
  - create application
  - follow its framework steps
    - install `@clerk/nextjs`
    - add env variables
    - src/middleware.ts
  - Create a JWT Template
    - Clerk dashboard app -> Configure -> JWT templates -> `convex` -> save
    - Do NOT rename the JWT token, it must be called `convex`
    - Copy the Issuer URL
  - Create the auth config
    - auth.config.ts
  - modify convex-client-provider
    - fullscreen-loader.tsx
  - navbar + UserIcon

```bash
npm install @clerk/nextjs@6.5.1 --legacy-peer-deps
```

## Create and list documents

[05:51:27](https://www.youtube.com/watch?v=gq2bbDmSokU&t=21087s) 

- convex/documents `create`
  - TODO: integration with [tanstack](https://docs.convex.dev/client/tanstack-query)
- templates-gallery.tsx
  - useMutation() create doc

- convex/documents `get` with pagination
- (home)/page.tsx (+DocumentsTable)
  - usePaginatedQuery()
- documents-table.tsx
  - ui table
  - DocumentRow

## Update and delete documents

[06:19:00](https://www.youtube.com/watch?v=gq2bbDmSokU&t=22740s) 

- DocumentMenu
  - ui dropdown menu
- convex/documents `removeById` `updateById`
- rename-dialog
  - ui Dialog
  - conflicts with dropdown and dialog `modals`
- remove-dialog
  - ui AlertDialog

## Search documents 

[06:49:22](https://www.youtube.com/watch?v=gq2bbDmSokU&t=24562s) 

- convex/documents `get`
- (home)page.tsx useSearchParam

## Organizations feature

[06:57:25](https://www.youtube.com/watch?v=gq2bbDmSokU&t=25045s) 

- clerk dashboard -> configure -> organization settings (enable)
- Clerk dashboard -> Configure -> JWT templates -> `convex`
  - claims add `"organization_id": {{org.id}}`
- (home / doc)navbar.tsx OrganizationSwitcher + redirects

- convex/documents `create` `get` `update`
  - add organizationId

- Toaster
  - root layout
  - remove-dialog.tsx rename-dialog.tsx template-gallery.tsx `toast`

## Collaboration setup (Liveblocks)

[07:23:29](https://www.youtube.com/watch?v=gq2bbDmSokU&t=26609s) 

- [live block](https://liveblocks.io/)
  - dashboard quick start -> text editor -> liveblocks tiptap -> next.js -> follow the steps
  - room.tsx, threads.tsx
  - update page.tsx editor.tsx, ...
- eslint error fixed

```bash
npm install @liveblocks/client@2.12.2 @liveblocks/react@2.12.2 @liveblocks/react-ui@2.12.2 @liveblocks/react-tiptap@2.12.2 --legacy-peer-deps
# error missing deps then
npm i @tiptap/extension-collaboration@2.10.2 @tiptap/extension-collaboration-cursor@2.10.2 y-protocols@1.0.6 --legacy-peer-deps

npx create-liveblocks-app@2.20240816.0 --init --framework react
```

## Room permissions

[07:47:12](https://www.youtube.com/watch?v=gq2bbDmSokU&t=28032s) 

- env liveblocks API key

```bash
npm i @liveblocks/node@2.12.2 --legacy-peer-deps
```

- api/liveblocks-auth/route.ts
- convex/documents `getById`
- global error
  - FIXME

## Populate user information

[08:09:06](https://www.youtube.com/watch?v=gq2bbDmSokU&t=29346s) 

- room.tsx
  - resolve users mentionSuggestions 
- `[documentId]/actions.ts`
- avatars.tsx + liveblocks.config.ts

## Notifications feature

[08:30:35](https://www.youtube.com/watch?v=gq2bbDmSokU&t=30635s) 

- inbox.tsx -> navbar.tsx
- room.tsx authEndpoint
- convex/documents `getByIds` + actions.ts
- global.css liveblocks z-index issue

## Collaborative margin ruler

[08:47:19](https://www.youtube.com/watch?v=gq2bbDmSokU&t=31639s) 

- liveblocks config storage
- room.tsx initialStorage
- editor.tsx useStorage
- ruler.tsx useMutation

## Document information

[08:53:29](https://www.youtube.com/watch?v=gq2bbDmSokU&t=32009s) 

- document.tsx
- `[documentId]/page.tsx`
- loading.tsx
- navbar.tsx props document, update docTitle

- DocumentInput props title + id
  - use-debounce.ts
  - icons status
