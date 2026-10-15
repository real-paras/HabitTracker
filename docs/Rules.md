# Rules: How the AI Agent Must Work on HabitTracker

> These rules apply to every task, every time. If a rule conflicts with a quick shortcut, the rule wins. If the user's latest message conflicts with a rule, ask once to confirm, then follow the user.

## 1. Who You Are Working With
- The user is **Paras**, a second-year CS student. Treat him as a **complete beginner for everything new in this project**, even if he has used MERN before.
- He wants to understand **literally everything**: what each command does, why each file exists, what each line of code means.

## 2. Read First, Every Session
At the start of every session, read in this order:
1. `docs/Memory.md` (current status and decisions)
2. `docs/Tasks.md` (what is done and what is next)
3. `docs/Rules.md` (this file)
4. `docs/PRD.md`, `docs/Architecture.md`, `docs/Design.md` as needed for the current task

At the end of every task, **update `docs/Memory.md` and tick the box in `docs/Tasks.md`**.

## 3. Module and Pacing Rules
- Work follows the numbered modules in `docs/Tasks.md` (Module 1, sub-module 1.1, 1.2, ...).
- Do **one sub-module at a time**. After finishing, **stop and wait**.
- If the user says **"next"**, move to the next sub-module in order.
- If the user says **"switch to X.X"** (e.g. "switch to 2.3"), jump straight to that sub-module.
- Never merge several sub-modules into one response unless asked.
- When a sub-module is very large, split it into steps and wait for "next" between steps.

## 4. Explanation Rules (Teaching Mode)
For every sub-module, before or alongside the code:
1. **What** are we building and **why** it is needed for the app.
2. **Concepts:** explain every concept used, even basic ones (what a hook is, what a JWT is, what an index is, what CORS is, what a service worker is).
3. **Define** every new term, library, and command the first time it appears, in plain language.
4. **Walk through** the code after showing it: what each important block does, in order.
5. **Explain every terminal command** before asking the user to run it: what it does, what output to expect, what to do if it fails.
6. Explain **why** a choice was made over alternatives, briefly.
7. No unexplained jargon. No "just do X". No skipped steps.

## 4b. Visuals
When a diagram helps (architecture, data flow, module hierarchy), produce a **proper visual**: a Mermaid diagram (rendered by GitHub) or an image. **Do not use ASCII-art diagrams.** For roadmaps and hierarchies use a **tree layout** (top-down hierarchy), not a flat linear flow. File/folder listings in a code block are fine.

## 5. Code Delivery Rules
- Give **complete files**, ready to copy-paste, with the file path stated above each one. No partial snippets unless the user asks for a tiny isolated change.
- **One change at a time.** Do not edit unrelated files in the same step.
- Add **clear comments** in code for a beginner (why, not just what).
- Follow the folder structure in `docs/Architecture.md` exactly. If something must change, explain why, then record it in `docs/Memory.md`.

## 6. Self-Review Rule (before showing any code)
Before showing code, **review and improve it at least 5 times**, checking:
1. It does what the sub-module asks and matches `PRD.md`.
2. It matches `Architecture.md` (schemas, routes, naming, folders).
3. Correctness and edge cases (empty data, wrong input, timezone/date issues, duplicate submissions).
4. Security (auth on route, `userId` scoping, validation, no secrets).
5. Beginner readability, comments, imports, and file paths being right.

If a pass finds a problem, fix it and **restart the checks**. Show only the final version, and briefly tell the user what important thing you caught and fixed so they learn from it.

## 7. Destructive Actions (very important)
Deleting is allowed **only** for the one-time project reset in Task 0.1 and only under these safeguards:
1. **Work only inside the HabitTracker project folder.** Never touch anything outside it. Confirm the current directory with `pwd` (or `cd` on Windows) and show it to the user first.
2. **Never delete the `.git` folder.** The repository history and remote must stay.
3. **List exactly what will be deleted** (files and folders) and **wait for the user to type "yes, delete"** before running any delete command.
4. **Never run** commands that delete outside the project, such as `rm -rf /`, `rm -rf ~`, `rm -rf ..`, or anything with a wildcard on a parent folder.
5. **Never use `git push --force`** unless the user explicitly asks for it in that message and you have explained the risk.
6. After the reset, the **documentation files must be restored** from the user's saved copy (see `docs/1prompt.md`), because the wipe removes them from the project folder.

For all other deletions (a file you created by mistake, etc.), ask first.

## 8. Git and GitHub Rules
Repository: `https://github.com/real-paras/HabitTracker.git` (existing repo; keep it, replace its contents).

1. **Basic structure = one single commit.** After scaffolding the base structure (folders, docs, `.gitignore`, README), run `git add .` once, then one commit:
   `git commit -m "add basic project structure"`
2. **Every later change = its own commit.** Stage only the files for that change (`git add <specific files>`), then commit with a short, plain message:
   - `git commit -m "add habit model"`
   - `git commit -m "add login route"`
   - `git commit -m "add contribution grid component"`
3. One logical change per commit. Messages are lowercase, imperative, specific, no trailing period noise.
4. Before each commit, show the user `git status` and explain the output.
5. **Never commit** `.env`, `node_modules`, build output, keys, or tokens. Check `.gitignore` first. If a secret was ever staged, stop and explain how to fix it.
6. **Push reminders:**
   - At the end of every sub-module: tell the user to push, and explain `git push`.
   - At the end of every module: run a full check (app runs, no errors), then remind to push.
   - **At the very end of the project: final reminder to push everything**, verify the GitHub page shows all commits and files, and confirm `.env` is not in the repo.
7. Do not run `git push` yourself until the user says yes. Never ask the user to paste passwords or tokens into the chat. If GitHub sign-in is needed, guide them to the browser or Git credential prompt.
8. If a Git command fails, explain the error in plain words, then fix step by step.

## 9. Using the Required UI Repositories
- **shadcn/ui** (`https://github.com/shadcn-ui/ui`) and **React Bits** (`https://github.com/DavidHDev/react-bits`) are the UI sources.
- **Before using either, read their current README/docs** and use the install method they document today. Do not guess commands.
- Use the **Tailwind variants** of React Bits components.
- Prefer shadcn/ui components for all standard UI (buttons, forms, dialogs, tabs, tooltips, toasts, switches, selects, cards, dropdowns).
- Use React Bits **sparingly** for delight (auth page background, animated headings, streak counters), never in a way that hurts performance or accessibility. Respect `prefers-reduced-motion`.
- Log every component added in `docs/Memory.md`.

## 10. Coding Standards
- Language: as decided in `docs/Memory.md` (default JavaScript, ES modules).
- Naming: `camelCase` variables/functions, `PascalCase` React components and Mongoose models, `kebab-case` for non-component file names where appropriate, consistent with the structure in `Architecture.md`.
- No unused code, no leftover `console.log` debugging, no commented-out blocks.
- Async code uses `async/await` with proper error handling; Express errors go through the central error handler.
- Validate all input with Zod on the server. Never trust the client.
- Every DB query on user data is scoped by `userId`.
- Store log dates as `YYYY-MM-DD` strings in the user's timezone (see `Architecture.md` Section 5).
- Keep components small and focused; extract hooks for data logic.
- Accessibility: semantic HTML, labels on inputs, focus states, text alternatives for grid cells.

## 11. Security Rules
- Never hardcode secrets. Use `.env` files and keep `.env.example` updated with names only.
- Never log passwords, tokens, or full request bodies containing them.
- Passwords: bcrypt. Auth: httpOnly cookie JWT.
- Add `helmet`, CORS with an exact origin, and rate limits on auth routes.

## 12. Testing and Verification
- After each sub-module, **tell the user exactly how to verify it works** (what to run, what to click, what they should see) and what a failure looks like.
- Use a REST client (Thunder Client, Postman, or `curl`) to test API routes, and explain how.
- Do not move on while the current sub-module is broken.

## 13. Communication Style
- Friendly, patient, plain language. Short paragraphs. Numbered steps for procedures.
- Ask a question when something is ambiguous, but ask **one question at a time** and propose a default.
- If you are unsure about a library's current API, **check the official docs** and say so.
- Be honest about limitations and risks (e.g. free-hosting sleep and scheduled reminders, iOS push requirements).
- Never claim something was tested if it was not.

## 14. Scope Control
- Build only what `docs/Tasks.md` lists for Phase 1. Ideas for later go in the "Parking Lot" section of `docs/Memory.md`.
- Do not add libraries not listed in `Architecture.md` without explaining why and getting approval.
