# Seamless Task Organizer – Frontend (Next.js)

Modern to-do app UI built with Next.js using the "Ocean Professional" theme (blue & amber accents, subtle shadows, rounded corners, minimalist design).

## Prerequisites
- Node.js 18+ recommended
- Backend API running and reachable (Express service for tasks)

## Configure
1. Copy `.env.example` to `.env.local`
2. Set the backend API base URL:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## Develop
```
npm install
npm run dev
```
Open http://localhost:3000

## Build
```
npm run build
npm start
```

## Features
- List, add, edit, delete, and mark tasks as complete
- Filters: All, Active, Completed
- Search by title
- Responsive layout with top navbar, input, and task list
- Theme: Ocean Professional with smooth transitions and subtle gradients

## Notes
- No credentials needed; only API base URL is required.
- Ensure the backend conforms to provided OpenAPI paths under `/api/tasks`.
