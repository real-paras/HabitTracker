# PRD: HabitTracker

> Product Requirements Document. This says **what** we are building and **why**. How it is built lives in `Architecture.md`; how it looks lives in `Design.md`.

## 1. Product Summary
HabitTracker is a habit tracking app whose centerpiece is a **GitHub-contribution-style grid**: a year of small squares per habit, where each square shows whether the habit was done that day. It runs as a web app and as an installable mobile app (PWA) that stay in sync because both use the same backend and database.

It is built first for its creator (Paras) and will be **published for other users later**, so it is multi-user from day one.

## 2. Goals
1. Let a user create **unlimited habits** and track them daily on a grid.
2. Remind the user to mark habits, through the channel(s) **they choose**: push notification, email, in-app.
3. Feel **personal**: themes, colors, and a dashboard that speaks to the user's own progress.
4. Work the same on desktop browser and phone, with data always in sync.
5. Be a clean, well-documented portfolio project on GitHub.

## 3. Non-Goals (Phase 1)
- Google sign-in (planned for a later phase; email + password only now)
- Native iOS/Android apps (the PWA covers mobile for now)
- Social features, public profiles, sharing grids, leaderboards
- Habits with numeric targets (e.g. "drink 8 glasses"); Phase 1 habits are done / not done
- AI features, analytics exports, payments

## 4. Target Users
- **Primary:** Paras, a student who wants a visual, motivating tracker.
- **Future:** anyone who likes GitHub's streak visuals and wants flexible reminders.

## 5. User Stories

### Account
- As a user, I can sign up and log in with email and password.
- As a user, I can log out, and my data is private to me.
- As a user, I can set my timezone so "today" and reminder times are correct.

### Habits
- As a user, I can create a habit with a name, optional description, color, optional emoji, and a frequency (every day, or chosen weekdays).
- As a user, I can create as many habits as I want.
- As a user, I can edit a habit.
- As a user, I can archive a habit so it disappears from my dashboard but its history is kept.
- As a user, I can permanently delete a habit and its history (with a confirmation).
- As a user, I can optionally give a habit a category/tag.

### Grid and tracking
- As a user, I see a year-long grid for each habit.
- As a user, I can click/tap a day to mark it done or not done, including past days.
- As a user, I can see current streak and longest streak per habit.
- As a user, I see a dashboard that combines all habits (summary cards plus a combined heatmap).
- As a user, hovering/tapping a cell shows the date and status.

### Reminders
- As a user, I choose per habit: reminder time(s), and which channel(s): push, email, in-app (any combination).
- As a user, I can choose one-time nudge or repeat-until-done-today.
- As a user, I can enable/disable push notifications from the browser/installed app.
- As a user, I never get a reminder for a habit I already marked done today, or on days the habit is not scheduled.

### Personalization
- As a user, I can switch light/dark/system theme.
- As a user, I can pick an accent color and a grid color palette.
- As a user, my dashboard greets me and summarizes my streaks.

## 6. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F1 | Email + password signup/login with secure password hashing | Must |
| F2 | Per-user data isolation on every query | Must |
| F3 | Habit CRUD with archive, no limit on count | Must |
| F4 | Daily log toggle (done/not done) for any date within the grid range | Must |
| F5 | Year grid per habit, plus combined dashboard grid | Must |
| F6 | Current and longest streak calculation | Must |
| F7 | Reminder settings per habit (time, channels, repeat mode) | Must |
| F8 | Web Push reminders | Must |
| F9 | Email reminders | Must |
| F10 | In-app reminders (banner/notification center) | Must |
| F11 | Theme, accent color, grid palette preferences | Should |
| F12 | PWA: installable, app-shell offline support | Should |
| F13 | Habit categories/tags and filtering | Could |
| F14 | Offline marking with sync on reconnect | Could |

## 7. Non-Functional Requirements
- **Security:** hashed passwords, httpOnly cookie auth, input validation on every endpoint, no secrets in git.
- **Performance:** fetching a year of logs for a habit must be fast (indexed query); dashboard loads in under 2 seconds on a normal connection.
- **Responsiveness:** mobile-first layout; usable from 360px width up.
- **Accessibility:** keyboard operable, readable contrast, grid cells have text labels for screen readers, respects reduced-motion.
- **Reliability:** reminders must not fire twice for the same habit/time/day.
- **Maintainability:** consistent structure, documented decisions in `Memory.md`.

## 8. Success Criteria for Phase 1
- A new user can sign up, create 10+ habits, mark days, and see grids and streaks update instantly.
- Reminders arrive through each chosen channel at the chosen time (in the user's timezone).
- The app can be installed to a phone home screen and shows the same data as the desktop browser.
- Project is pushed to GitHub with a clear commit history and README.

## 9. Known Constraints and Risks
- **Push on iPhone** works only for the PWA installed to the Home Screen (iOS 16.4+); on Android and desktop it works in the browser.
- **Scheduled reminders need an always-running server.** Free hosting tiers may "sleep" and miss reminders. Acceptable while developing; must be addressed before publishing (paid tier, keep-alive, or an external scheduler).
- **Timezones** are the most common source of habit-app bugs. Dates are stored as `YYYY-MM-DD` strings in the user's timezone (see `Architecture.md`).
- **Email deliverability** needs a real provider; the free tier is enough for development.

## 10. Future Phases (do not build now, but do not block them)
- Google sign-in
- Public shareable profile grid (like a GitHub profile)
- Numeric/quantity habits
- Native wrapper (Capacitor) if needed
- Weekly summary emails
