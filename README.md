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
