# Devs Blog

A full-stack blog platform for developers, built with React and Node.js.

## Tech Stack

**Frontend:** React 19, Vite, TailwindCSS, Zustand, Framer Motion, GSAP
**Backend:** Node.js, Express 5, MongoDB/Mongoose, JWT, WebSockets
**UI:** Chakra UI, Material-UI, Lucide React

## Features

- User authentication (sign up / sign in)
- Blog posts by category (Full Stack, Backend, Mobile, AI & ML, QA, DevOps, Game Dev)
- User profiles with follow/followers
- Real-time chat via WebSockets
- Favorites & notifications
- Dark/light theme

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your values in .env
```

### Running

```bash
# Run frontend + backend together
npm run dev:full

# Frontend only
npm run dev

# Backend only
nodemon backend/server.js
```

### Build

```bash
npm run build
```

## Project Structure

```
├── backend/          # Express server, routes, controllers, websocket
├── src/
│   ├── pages/        # Route-level page components
│   ├── components/   # Reusable UI components
│   ├── context/      # Zustand state stores
│   ├── routes/       # Protected route wrappers
│   ├── layouts/      # Page layout wrappers
│   └── service/      # API client
├── constants/        # Shared constants (categories, sidebar)
└── public/           # Static assets
```

## Environment Variables

See `.env.example` for required variables.
