# PeoplePulse

**Every neighbourhood has a pulse.** PeoplePulse is a community platform where people organise and join social-service events such as winter clothes drives, food kitchens, cleanups and plantations.

**Live site:** https://peoplepulse-client-884h.vercel.app

## Features

- Create events with a type, location, thumbnail, volunteer target and a future-only date
- Join any upcoming event once, with live volunteer-spot counts, and leave again if plans change
- Manage Events page to view, edit and delete only the events you created
- Joined Events page listing everything you signed up for, sorted by date
- Email and password sign-up with password rules, plus GitHub login, using Better Auth and JWT-protected API routes
- Search and filter upcoming events by type, with loading skeletons
- Light and dark theme toggle and a fully responsive layout

## Tech stack

Next.js (App Router), Tailwind CSS with DaisyUI, Better Auth with the MongoDB adapter and JWT, Express.js and MongoDB.

## Run locally

1. Run `npm install`
2. Create a `.env.local` file with your own MongoDB, Better Auth and GitHub OAuth values
3. Run `npm run dev`
4. Open http://localhost:3000

The Express server must also be running (see the server repository).
