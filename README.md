[![Build and Test](https://github.com/protofy/nextjs-template/actions/workflows/build.yml/badge.svg)](https://github.com/protofy/nextjs-template/actions/workflows/build.yml)

This is the Protofy Next.js starter project. It can be used as a starting point for new web projects.  
It includes the following features/tools:

- [Next.js](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for code style
- [Storybook](https://storybook.js.org/) for component development
- [Vitest](https://vitest.dev/) with
  [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [msw](https://mswjs.io/)
  for testing
- [Husky](https://typicode.github.io/husky/) for git hooks
- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) to visualize the size of the production
  build
- [Vercel CLI](https://vercel.com/docs/cli) for connecting to Vercel projects

## Table of Contents

- [Project structure](#project-structure)
- [Setup](#setup)
- [Environment variables](#environment-variables)
- [Linting](#linting)
- [Testing](#testing)
- [Storybook](#storybook)
  - [Server components](#server-components)
- [Git Hooks](#git-hooks)
- [Bundle Analyzer](#bundle-analyzer)
- [Deployment](#deployment)

## Project structure

The recommended structure for the project is as follows:

- `src`: The main source folder
  - `assets`: Images, fonts, etc.
  - `components`: Reusable components
    - `ComponentName`: Component folder
      - `ComponentName.tsx`: Component file
      - `ComponentName.stories.tsx`: Storybook stories
      - `ComponentName.test.tsx`: Component tests
  - `const`: Shared constants
  - `hooks`: Custom hooks
  - `mocks`: API mocks
    - `handlers.ts`: Mock API handlers
  - `types`: TypeScript types
  - `utils`: Utility functions

## Setup

Some features might work best with VSCode (e.g. automated linting), so it is recommended to use it as the main code
editor.  
Contributions are welcome, so please create a PR if you want to add features for your favorite editor. 🙂

Here's how to get started:

1. Clone the repository
2. Run `yarn` to install the dependencies
3. Run `yarn dev` to start the development server

## Environment variables

Next.js automatically picks up environment variables from `.env.local` and `.env`.  
If your project is deployed to Vercel, you can set environment variables in the Vercel project dashboard. To use those
environment variables locally, you can run `yarn env:pull` to sync them to your local `.env.local` file.  
You might need to link your project first using `yarn vercel link`.  
**Warning**: Pulling the env variables will overwrite any changes you made to your local `.env.local` file.

## Linting

The project uses ESLint and Prettier to enforce code style. You can run `yarn lint` to check for linting errors and
`yarn lint:fix` to fix them. If you use VSCode, fixing automatically happens on save. This is configured in
[.vscode/settings.json](.vscode/settings.json).  
The project also includes a pre-commit hook that runs the linter via `lint-staged` before committing. This is configured
in [.husky/pre-commit](.husky/pre-commit).

## Testing

The project uses Vitest for testing. You can run `yarn test` to run the tests or `yarn test:watch` to run the tests in
watch mode.  
The project also includes msw to mock API requests. You can find an example for mocks in
[src/mocks/handlers.ts](src/mocks/handlers.ts) and for tests using those mocks in
[src/mocks/handlers.test.ts](src/mocks/handlers.test.ts).  
The mocks are initialized in [vitest-setup.ts](./vitest-setup.ts).

## Storybook

The project includes Storybook for component development. You can run `yarn storybook` to start the Storybook server.

### Server components

Support for Next.js server components is currently experimental.  
Add a `<Suspense>` component around your Story in the decorator like this to use a server component:

```tsx
decorators: [
  Story => (
    <Suspense>
      <Story />
    </Suspense>
  ),
],
```

## Git Hooks

The project uses Husky to run git hooks. The [pre-commit hook](./.husky/pre-commit) runs a few things before committing:

- `yarn` to make sure the dependencies are up to date
- `git add yarn.lock` to make sure the lock file is up to date
- `yarn lint-staged` to check for linting errors
- `yarn test` to run the tests

## Bundle Analyzer

The project includes the [Next.js bundle analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) to visualize the
size of the production build. You can run `yarn build:analyze` to start the bundle analyzer. This will build the project
and open a new tab in your browser with the bundle analyzer.

## Deployment

The easiest way to deploy the project is to use Vercel. The Vercel CLI is already included in the project in case you
want to use features like syncing environment variables.  
To deploy using Vercel, you need to create a new Vercel project and link it to the GitHub repository using the Vercel
website.  
This will automagically create a new deployment whenever you push to the GitHub repository. ✨

For other deployment options, check the
[Next.js documentation](https://nextjs.org/docs/app/building-your-application/deploying).
