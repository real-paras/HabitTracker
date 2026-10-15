# HabitTracker

A GitHub-contribution-style grid habit tracker application built with the MERN stack and TypeScript. Installable as a Progressive Web App (PWA) with multi-channel reminders (Web Push, Email, In-app).

## Key Features

- **GitHub-Style Contribution Grid**: Visual 365-day heatmaps for individual habits and an aggregated dashboard view.
- **Unlimited Habits**: Track any number of daily or weekday habits with zero limits.
- **Multi-Channel Reminders**: Tailor notifications per habit via Browser Push, Email, and In-App badges.
- **Timezone-Safe Tracking**: Dates are stored in `YYYY-MM-DD` format according to user's local timezone.
- **Progressive Web App**: One unified codebase running seamlessly across desktop browsers and mobile devices.
- **Personalized UI**: Light/Dark/System themes, accent color selection, and custom grid color palettes.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Bits, TanStack Query, React Router
- **Backend**: Node.js, Express, TypeScript, Mongoose, Zod
- **Database**: MongoDB Atlas
- **Auth**: JWT stored in httpOnly, SameSite cookies + bcrypt password hashing
- **Reminders**: `node-cron`, `web-push` (VAPID), Nodemailer / Resend

## Documentation

Full project planning and architectural details are organized inside the `docs/` folder:

- [`docs/PRD.md`](docs/PRD.md): Product Requirements Document
- [`docs/Architecture.md`](docs/Architecture.md): System architecture, data schemas, API routes, and decisions
- [`docs/Design.md`](docs/Design.md): Design system, tokens, palettes, and component guidelines
- [`docs/Rules.md`](docs/Rules.md): Project development rules and guidelines
- [`docs/Tasks.md`](docs/Tasks.md): Numbered roadmap and progress tracking
- [`docs/Memory.md`](docs/Memory.md): Project memory log and decisions
