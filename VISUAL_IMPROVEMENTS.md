# Visual Improvements Summary

> UI overhaul targeting Linear / Notion / Vercel quality.  
> 22 files modified, build passes clean, zero new warnings.

---

## Foundation — `index.css`

| Change | Why |
|---|---|
| Inter font via Google Fonts | Same typeface as Linear, Vercel, Raycast. Replaces generic system fonts. |
| Custom scrollbar (WebKit + Firefox) | Thin, translucent, dark-mode-aware. Removes ugly browser defaults. |
| `::selection` with indigo tint | Subtle brand reinforcement on text selection. |
| Global `:focus-visible` ring | Keyboard navigation visible on every interactive element (a11y). |
| `prefers-reduced-motion` media query | Disables animations for vestibular disorder users (WCAG 2.1). |
| `-webkit-tap-highlight-color: transparent` | Removes blue flash on mobile tap — native app feel. |
| Custom keyframes (`slide-up`, `slide-down`, `fade-in`, `scale-in`) | Spring-like cubic-bezier curves for smooth, purposeful motion. |

---

## Components

### Button (`Button.tsx`)

- Added `cursor-pointer` — was missing, buttons looked non-interactive.
- Added `active:scale-[0.97]` — micro-scale on press for tactile feedback.
- Added `focus-visible:outline-indigo-500` — keyboard focus ring.
- Primary variant changed from `bg-slate-900` to `bg-indigo-600` — brand color consistency.
- Added `shadow-indigo-500/25` on primary — depth and glow matching Vercel button style.

### Card (`Card.tsx`)

- Added `hoverable` prop — enables shadow + border transition on hover.
- Rounded corners consistent at `rounded-2xl`.

### Modal (`Modal.tsx`)

- Wrapped in `AnimatePresence` + `motion.div` — scale + fade + translate on enter/exit.
- Overlay fades in/out separately from content.
- Eliminates jarring pop-in/pop-out.

### Tooltip (`Tooltip.tsx`)

- Framer Motion fade + scale animation on appear/disappear.
- `AnimatePresence` for clean unmount.

### Dropdown (`Dropdown.tsx`)

- Framer Motion slide-down + scale animation.
- `shadow-xl` for elevated popover feel.
- `AnimatePresence` for clean unmount.

### EmptyState (`EmptyState.tsx`)

- Framer Motion entrance animation (fade + translate Y).
- Gradient icon container with `ring-1` accent.
- Transforms dead empty states into polished onboarding moments.

### Toast (`Toast.tsx`)

- **Fixed broken animation** — was using `animate-slide-up` CSS class that didn't exist.
- Now uses Framer Motion `slide-up` variant with `AnimatePresence`.

### Input / Textarea / Select

- Consistent `rounded-xl` across all form elements.
- Disabled state: `opacity-50`, `cursor-not-allowed`, muted background.
- Placeholder: `opacity: 1` globally for consistent visibility.

### Badge (`Badge.tsx`)

- Dark mode uses `bg-{color}-500/10` with `border-{color}-500/20` — transparent tints instead of solid dark blocks.

### Avatar (`Avatar.tsx`)

- Gradient background for initials (`from-indigo-500 to-indigo-600`).
- `ring-2 ring-white dark:ring-slate-900` — "cut-out" depth effect.

### Skeleton (`Skeleton.tsx`)

- `rounded-xl` for rectangular variant, `bg-slate-700/60` in dark mode — softer loading states.

### Tabs (`Tabs.tsx`)

- Added `cursor-pointer`, hover border transition.

---

## Layout

### Sidebar (`Sidebar.tsx`)

| Change | Why |
|---|---|
| `backdrop-blur-xl` + `bg-white/80` | Glassmorphism matching Linear/Vercel sidebar. |
| Gradient logo icon | More polished than flat color. |
| Active state: `shadow-sm` + `ring-1 ring-indigo-500/10` | Subtle "selected" indicator without heaviness. |
| `scrollIntoView` for active link | Prevents active item from being hidden on long nav lists. |
| `strokeWidth={1.75}` on icons | Lighter icon weight for modern aesthetic. |
| Mobile overlay: `bg-black/40 backdrop-blur-sm` | Matches desktop sidebar blur. |

### MainLayout (`MainLayout.tsx`)

- Mobile header: `backdrop-blur-xl` — consistent glass effect with sidebar.
- Border: `border-slate-200/60` — softer, less visible divider.

---

## Dashboard

### StatCard (`StatCard.tsx`)

- Framer Motion stagger entrance (delay based on `index` prop).
- Dark mode icons use `bg-{color}-500/10` with `ring-{color}-500/10`.
- Trend text: `text-emerald-600 dark:text-emerald-400` for positive.

### HabitChecklist (`HabitChecklist.tsx`)

- Dark mode borders: `border-slate-800` (was `border-gray-100` — invisible in dark).
- Hover: `bg-slate-800/60` with `transition-all`.
- Flame badge: `bg-orange-50 dark:bg-orange-500/10`.

### ReadingProgressCard (`ReadingProgressCard.tsx`)

- Progress bar: `bg-gradient-to-r from-indigo-500 to-indigo-600` — gradient adds richness.
- Cover image wrapper: `rounded-xl overflow-hidden` for clean edges.
- Dark mode text: `text-slate-900 dark:text-white` for title, `text-slate-500 dark:text-slate-400` for subtitle.

### Dashboard Page (`Dashboard.tsx`)

- **Quick Actions**: Converted from plain Buttons to custom cards with colored icon badges (`bg-indigo-50`, `bg-emerald-50`, `bg-amber-50`). Each action has a distinct color identity.
- **Pro Tip card**: `bg-gradient-to-br from-indigo-600 to-indigo-700` with animated Zap icon on hover.
- **Goal cards**: Use `hoverable` prop, gradient progress bars.
- **Section headers**: Consistent `text-base font-semibold` with indigo icon accent.

---

## Notes

### NoteCard (`NoteCard.tsx`)

- Framer Motion `whileHover={{ y: -3 }}` — subtle lift on hover.
- Three-dot menu: `opacity-0 group-hover:opacity-100` — hidden until hover, reducing clutter.
- Pinned state: `shadow-sm shadow-indigo-500/5` — barely visible but present.

### NoteListItem (`NoteListItem.tsx`)

- Framer Motion entrance animation (fade + translate Y).
- Same opacity pattern for action buttons as NoteCard.

---

## Other Files

| File | Change |
|---|---|
| `App.css` | Stripped all dead Vite template CSS (~130 lines of unused rules). |
| `index.html` | Title → "KnowledgeOS", added `theme-color` meta (light/dark), fixed script path `main.jsx` → `main.tsx`, added description meta. |
| `Badge.tsx` | Dark mode transparent tints. |
| `Avatar.tsx` | Gradient initials, ring accent. |
| `Table.tsx` | `rounded-lg` on skeletons, `duration-150` on row hover. |
| `Skeleton.tsx` | `rounded-xl` rectangular, `bg-slate-700/60` dark. |
| `Tabs.tsx` | `cursor-pointer`, hover border. |

---

## Design Principles Applied

1. **Visual hierarchy** — Headers use `font-bold tracking-tight`, section labels use `text-xs uppercase tracking-wider`, body uses `text-sm`.
2. **White space** — Consistent padding (`p-5 md:p-7` in cards, `gap-4 md:gap-5` in grids).
3. **Interactive states** — Every button, card, and link has hover, focus-visible, and active states.
4. **Motion** — Framer Motion for page transitions, stagger entrances, hover lifts. CSS transitions for micro-interactions (colors, shadows).
5. **Responsive** — Mobile-first with `sm:`, `md:`, `lg:` breakpoints. Sidebar collapses to overlay on mobile.
6. **Dark mode** — Every component has full dark mode support using `dark:` variants with transparent tints.
7. **Accessibility** — Focus-visible rings, reduced-motion support, ARIA labels, semantic HTML.
