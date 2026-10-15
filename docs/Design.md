# Design: HabitTracker

> The visual and interaction design system. All UI work must follow this document. Component sources are **shadcn/ui** and **React Bits** (see `Architecture.md` Section 13).

## 1. Design Principles
1. **The grid is the hero.** Everything else supports it.
2. **Calm and focused.** A habit app should feel encouraging, never noisy.
3. **Mobile-first.** Design for a 360px phone first, then scale up.
4. **Instant feedback.** Tapping a grid cell updates immediately (optimistic update), with a subtle animation.
5. **Accessible by default.** Contrast, keyboard use, labels, reduced motion.
6. **Motion with purpose.** React Bits effects are used in a few chosen places, not everywhere.

## 2. Theme and Color Tokens
Use Tailwind with shadcn/ui's CSS variables so light and dark themes switch with one class.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--background` | white / very light gray | near-black (#0d1117-like) | page background |
| `--foreground` | near-black | near-white | main text |
| `--card` | white | slightly lighter than background | cards |
| `--muted` / `--muted-foreground` | light gray / mid gray | dark gray / mid gray | secondary text, empty cells |
| `--border` | light gray | dark gray | outlines |
| `--primary` | **user accent color** | **user accent color** | buttons, focus rings, active states |
| `--destructive` | red | red | delete actions |

- **Theme modes:** light, dark, system. Stored in `user.preferences.theme` and applied on load without a flash.
- **Accent color:** user picks from a preset list (e.g. green, blue, violet, orange, pink, teal). Default: green.

## 3. Grid Color Palettes
Each habit has its own `color`. The grid uses **5 intensity levels** derived from that color.

- **Per-habit grid (done / not done):** empty cell = `--muted`; done cell = the habit's full color. 
- **Combined dashboard grid:** intensity = share of that day's scheduled habits that were completed:

| Level | Completion | Look |
|-------|-----------|------|
| 0 | 0% or nothing scheduled | muted gray |
| 1 | 1-25% | lightest tint of the palette |
| 2 | 26-50% | light |
| 3 | 51-75% | medium |
| 4 | 76-100% | full color |

**Preset palettes the user can choose for the combined grid:** Classic Green, Ocean Blue, Sunset Orange, Violet, Monochrome. Each palette defines its 4 tints for light and dark mode.

Never rely on color alone to carry meaning: every cell also has an accessible text label (Section 7).

## 4. Typography
- Font: a clean sans-serif such as **Inter** (or the system font stack as fallback), loaded locally or via a font package.
- Scale (Tailwind): page title `text-3xl font-semibold`, section title `text-xl font-semibold`, body `text-base`, helper text `text-sm text-muted-foreground`.
- Numbers (streaks) use tabular numerals so they do not jump when changing.

## 5. Layout, Spacing, Shape
- Spacing uses Tailwind's 4px scale. Page padding: `p-4` mobile, `p-6`/`p-8` desktop. Max content width ~`max-w-6xl`, centered.
- Radius: `rounded-lg` for cards and inputs, `rounded-sm` (about 2-3px) for grid cells.
- Shadows: minimal; prefer borders.
- Breakpoints: mobile default, `md` for tablet, `lg` for desktop.

## 6. The Contribution Grid Component

**Structure:** columns = weeks, rows = days of the week (7 rows). Month labels above, weekday labels (Mon/Wed/Fri) on the left, legend ("Less ... More") below.

| Property | Value |
|----------|-------|
| Range | last 365 days ending today (rolling year) |
| Cell size | 12px (desktop), 11-12px (mobile) |
| Cell gap | 3px |
| Cell radius | 2-3px |
| First day of week | from user preference (default Monday) |
| Future days | shown dimmed and not clickable |
| Today | highlighted with a ring |

**Behavior**
- **Click/tap a cell:** toggle done/not done for that date (optimistic update; roll back with a toast if the request fails).
- **Hover (desktop) / long-press or tap (mobile):** tooltip with the date and status, e.g. "Mon, 12 Oct 2026: done".
- **Keyboard:** arrow keys move between cells, Space/Enter toggles. Cell has `role="button"`, `aria-pressed`, and an `aria-label` like "12 October 2026, done".
- **Mobile:** the grid scrolls horizontally inside its card and **starts scrolled to the most recent weeks**.
- **Non-scheduled days** (for weekday habits) are shown as a distinct "not applicable" style and cannot be marked.
- **Loading:** skeleton grid. **Empty:** friendly message and a prompt to mark today.
- A change animates with a quick scale/fade on the cell (disabled under reduced motion).

## 7. Accessibility Requirements
- Color contrast meets WCAG AA for text and controls.
- All interactive elements have visible focus styles.
- Every form input has a label and error message tied to it.
- Grid cells have text labels; the grid has a heading and a text summary ("23 of the last 30 days completed").
- Respect `prefers-reduced-motion`: disable React Bits animations and cell transitions.
- Touch targets are at least 40px for buttons and controls (grid cells excepted, which are supported by the zoomable layout and keyboard access).

## 8. Screens

### 8.1 Auth (Login / Signup)
- Centered card with logo, title, email, password (show/hide toggle), submit button, link to the other page.
- Inline validation messages. Friendly generic error on bad login.
- **React Bits:** one subtle animated background behind the card (low intensity).

### 8.2 Dashboard (home after login)
- **Header:** greeting ("Good evening, Paras"), today's date, summary line ("3 of 5 habits done today").
- **Summary cards:** habits done today, best current streak, total habits.
- **Today's checklist:** list of habits scheduled today with one-tap check buttons.
- **Combined heatmap:** the combined grid with palette legend.
- **Habit cards:** each shows emoji, name, current streak, a compact grid (last ~12-20 weeks), and a menu (edit, archive, delete).
- **Add Habit** button: floating button on mobile, header button on desktop.
- **React Bits:** animated number/counter for streaks, optional animated heading text.
- **In-app reminder banner** at the top when a reminder is due and the habit is not done.

### 8.3 Habit Detail
- Large full-year grid, streak stats (current, longest, total completions, completion rate), list of recent activity, edit and reminder settings.

### 8.4 Habit Form (dialog on desktop, full screen sheet on mobile)
- Fields: name, description, emoji picker, color picker (preset swatches), frequency (every day / chosen weekdays), category.
- **Reminder section:** switch on/off; time(s); channel checkboxes (Push, Email, In-app); repeat-until-done switch with interval.
- If Push is selected but not enabled in the browser, show an inline "Enable notifications" button with an explanation.

### 8.5 Settings
- Profile: name, email (read-only), timezone.
- Appearance: theme mode, accent color, grid palette, week start day.
- Notifications: push status for this device (enable/disable), list of subscribed devices, email reminder toggle.
- Account: log out.

### 8.6 Notification Center
- Bell icon in the navbar with an unread badge. Dropdown list of recent reminders; click opens the habit. "Mark all read".

## 9. Navigation
- **Mobile:** bottom tab bar (Dashboard, Add, Settings) plus top bar with the bell.
- **Desktop:** top navbar with logo, links, bell, theme toggle, user menu.
- Protected routes redirect to Login; Login/Signup redirect to Dashboard when signed in.

## 10. Component Map

**shadcn/ui (generated into `client/src/components/ui`)**
`button`, `card`, `input`, `label`, `form`, `dialog`, `sheet`, `tabs`, `tooltip`, `switch`, `checkbox`, `select`, `popover`, `dropdown-menu`, `avatar`, `badge`, `skeleton`, `sonner` (toasts), `separator`, `scroll-area`, `toggle-group`.

**React Bits (copied into `client/src/components/reactbits`, Tailwind variants)**
Used sparingly. Starting suggestions (verify they exist in the repo when installing, and pick lightweight ones):
- Auth page: one subtle animated background
- Streak numbers: a counter animation component
- Hero heading on auth/landing: one text animation

**Custom components (`client/src/components/grid`, `habits`, `layout`)**
`ContributionGrid`, `GridCell`, `GridLegend`, `HabitCard`, `HabitForm`, `ReminderSettings`, `StreakBadge`, `AppShell`, `ThemeToggle`, `NotificationBell`.

## 11. Motion Guidelines
- Durations 150-250ms for micro-interactions, ease-out.
- At most **one** decorative React Bits effect per screen.
- No auto-playing motion that cannot be disabled.
- All animations off when `prefers-reduced-motion: reduce`.

## 12. Iconography and Branding
- Icons: **lucide-react** (the shadcn/ui default).
- App name: HabitTracker. Simple logo mark: a small 3x3 grid of squares with one highlighted.
- PWA icons: 192px and 512px PNGs plus a maskable version; theme color matches the default accent.

## 13. Content and Tone
- Encouraging and short: "Nice, 5 days in a row!" not guilt-driven messages.
- Reminder text: "Time for {habit}. Keep your {n}-day streak going." Email subject: "Reminder: {habit}".
- Empty states always tell the user what to do next.
