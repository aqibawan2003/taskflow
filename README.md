# TaskFlow

A frontend-only to-do list built with React 18, Vite, and Tailwind CSS. Tasks and theme are saved in localStorage.

## Run it

Requires Node.js 18 or newer.

    npm install
    npm run dev

Then open the address Vite prints (usually http://localhost:5173).

## Build for production

    npm run build
    npm run preview

The output goes to `dist/` and can be hosted on any static host (Vercel, Netlify, GitHub Pages).

## Structure

    src/
      components/   Navbar, Hero, TodoApp, TodoItem, Features, Footer
      components/ui/  Button, Card
      hooks/        useLocalStorage
      App.jsx
