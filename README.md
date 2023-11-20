# task-manager

Task Manager is a web application built with:

- Nextjs
- Redux
- Tailwind CSS
- DaisyUI
- Typescript

[live demo](https://task-manager.stventek.com)

[backend](https://github.com/stventek/task-manager-backend)

## Features

- Manage Lists and Tasks: Easily organize and keep track of your tasks and lists within the application.
- Find a route on the map by providing an origin and destination.
- User Authentication: Securely authenticate users, allowing personalized task management.

## Deployment

As this is a user-focused application, SEO optimization is not a concern, and Server-Side Rendering (SSR) is not required. Instead, the application can be generated as a Static Site (SSG) using the command:

```bash
npm run build
```

This command produces a 'out' folder containing static assets that can be deployed to a CDN, bucket, or other hosting solutions.

## Getting Started

1. Clone the project.

```bash
git clone <repo>
```

2. Install the dependencies.

```bash
npm install
```

3. Configure the project settings:

- Rename the `.env.example` file to `.env` and update the settings accordingly.

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
