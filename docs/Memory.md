# Memory: HabitTracker Project Log

> The agent's living memory for this project. **Read this first every session. Update it at the end of every task.** Keep it short, factual, and current. Never put secrets or `.env` values here.

## 1. Current Status
- **Last completed task:** Task 1.4 (Module 1: Backend Foundation Complete)
- **Currently working on:** Module 2, Task 2.1
- **Next task:** 2.1 `User` model
- **Blockers:** none
- **Last updated:** 2026-10-16

## 2. Project Snapshot
- **App:** HabitTracker, a GitHub-style grid habit tracker (web + installable PWA), to be published for other users later
- **Repo:** https://github.com/real-paras/HabitTracker.git (existing repo; contents fully replaced, `.git` kept)
- **Owner:** Paras, second-year CS student, treated as a complete beginner for this build
- **Agent tool:** Antigravity

## 3. Decisions Made
| # | Decision | Reason |
|---|----------|--------|
| 1 | Frontend: Vite + React + TypeScript + Tailwind | Simple, fast, type-safe React |
| 2 | Backend: Express + TypeScript + MongoDB (Mongoose) | Reliable, modern type-safe MERN |
| 3 | UI: shadcn/ui + React Bits (Tailwind variants) | Requested by owner for UI quality and effects |
| 4 | Web + mobile via one PWA codebase | One codebase = perfect sync, no second app to maintain |
| 5 | Auth: email + password, JWT in httpOnly cookie, bcrypt | Secure and simple; Google sign-in comes later |
| 6 | Log dates stored as `YYYY-MM-DD` strings in the user's timezone | Avoids UTC off-by-one-day bugs |
| 7 | Reminders: node-cron every minute + web-push + Resend + in-app polling | Covers all three channels, user chooses per habit |
| 8 | Language: TypeScript (client and server) | Decided by owner for reliability and modern development |
| 9 | Git: first commit with `git add .`, afterwards one commit per change | Requested by the owner |
| 10 | Docs live in `docs/` | Keeps the root clean |

## 4. Conventions in Use
- Folders: `client/` and `server/` (see `Architecture.md` Section 3)
- Commit messages: short, lowercase, imperative (e.g. `add habit model`)
- Pacing: one sub-module at a time; owner says **"next"** or **"switch to X.X"**
- Code is always delivered as complete files with the path shown, after 5 self-review passes

## 5. Environment Variable Names
Names only. Values stay in local `.env` files that are never committed.
- **server:** `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, `NODE_ENV`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT`, `EMAIL_PROVIDER_API_KEY`, `EMAIL_FROM`
- **client:** `VITE_API_URL`

## 6. Useful Commands
Fill in as they are introduced and explained.
```
# server
(npm run dev)    # start the API with auto restart
# client
(npm run dev)    # start the Vite dev server
# git
git status
git add <files>
git commit -m "message"
git push
```

## 7. UI Components Added
| Source | Component | Where used | Date |
|--------|-----------|------------|------|
| (shadcn/ui or React Bits) | | | |

## 8. Completed Tasks Log
| Date | Task ID | What was done | Commit message |
|------|---------|---------------|----------------|
| 2026-10-16 | 0.1 | Safety check and wipe; removed old project files while keeping .git | (no commit yet) |
| 2026-10-16 | 0.2 | Restored docs into docs/, created client and server folders with .env.example, root .gitignore, README.md | `add basic project structure` |
| 2026-10-16 | 0.3 | First push to GitHub origin/main and verified clean repo | (push) |
| 2026-10-16 | 1.1 | Express + TypeScript server setup with helmet, cors, morgan, dotenv | `add express server setup` |
| 2026-10-16 | 1.2 | MongoDB Atlas & Mongoose setup in server/src/config/db.ts | `add mongodb connection` |
| 2026-10-16 | 1.3 | Central error handling, rate limiting, Zod validation, and 404 middleware | `add error handling and validation middleware` |
| 2026-10-16 | 1.4 | Health check route GET /api/health and REST verification | `add health check route` |

## 9. Problems and Fixes
Record errors that took effort to solve, so they are never repeated.
| Date | Problem | Cause | Fix |
|------|---------|-------|-----|
| 2026-10-16 | TS5108: Option 'moduleResolution=node10' has been removed | Legacy 'node' alias deprecated in newest TypeScript | Configured `"module": "NodeNext"` and `"moduleResolution": "NodeNext"` in `tsconfig.json` |
| 2026-10-16 | TS2322: Type 'unknown' not assignable to ParsedQs/ParamsDictionary | Zod `parseAsync` return type vs Express Request query/params type | Coerced parsed results using Express `Request['query']` and `Request['params']` |

## 10. Open Questions
- Language: Resolved (TypeScript chosen for client and server)
- Email provider: Resolved (Resend chosen for modern, reliable transactional email)
- Hosting: Will configure for persistent process hosting (e.g. Render / Railway) in Module 14

## 11. Parking Lot (ideas for later, do not build now)
- Google sign-in
- Public shareable profile grid
- Numeric/quantity habits
- Weekly summary email
- Capacitor native wrapper

## 12. Known Risks to Keep in Mind
- iOS push works only for the PWA installed to the Home Screen (iOS 16.4+)
- Free hosting that sleeps will miss scheduled reminders
- Timezone handling must be tested with at least two different timezones
