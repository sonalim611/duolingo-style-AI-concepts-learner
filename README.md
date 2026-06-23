# AIlingo

**Learn AI concepts the fun way** — a Duolingo-inspired MVP for mastering artificial intelligence through bite-sized lessons, quizzes, XP, and daily streaks.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **Landing page** — Product overview and call-to-action
- **AI learning path** — 6 lessons across 3 units (Foundations, How AI Works, Using AI Wisely)
- **Lesson screens** — Step-by-step explanations with optional Gemini AI enhancement
- **Quiz screens** — Multiple-choice questions with instant feedback
- **XP system** — Earn points for completing lessons and answering quizzes
- **Daily streaks** — Stay consistent with streak tracking
- **Progress tracking** — All progress stored in `localStorage`
- **Dashboard** — XP, completed lessons, accuracy %, and current streak
- **PostHog analytics** — `lesson_started`, `lesson_completed`, `quiz_answered`, `streak_extended`, `premium_clicked`
- **Gemini 2.5 Flash Lite** — On-demand AI lesson generation

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Analytics | PostHog |
| AI | Google Gemini 2.5 Flash Lite |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18.18+ (recommended: 20+)
- npm, yarn, or pnpm
- [Gemini API key](https://aistudio.google.com/apikey)
- [PostHog project](https://posthog.com) (optional for local dev)

### 1. Clone & Install

```bash
git clone https://github.com/sonalim611/duolingo-style-AI-concepts-learner.git
cd duolingo-style-AI-concepts-learner
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

> **Note:** The app works without API keys — lessons use built-in content. Gemini powers the "Enhance with AI" button. PostHog events are silently skipped if the key is missing.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## PostHog Analytics Setup

AIlingo uses [PostHog](https://posthog.com) for product analytics via `posthog-js`.

### 1. Create a PostHog project

1. Sign up at [posthog.com](https://posthog.com) (free tier available)
2. Create a new project
3. Copy your **Project API Key** (starts with `phc_`)
4. Note your **API host** — US cloud: `https://us.i.posthog.com`, EU cloud: `https://eu.i.posthog.com`

### 2. Configure environment variables

Add these to `.env.local` (and to Vercel under **Settings → Environment Variables** for production):

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Both variables are required for analytics to initialize. If `NEXT_PUBLIC_POSTHOG_KEY` is missing, events are silently skipped and the app works normally.

### 3. How it works

- `posthog-js` is installed as a dependency
- `lib/posthog.ts` initializes PostHog client-side using the env vars above
- `app/layout.tsx` wraps the entire app in `<PostHogProvider>`
- Event helpers in `lib/posthog.ts` call `posthog.capture()` for each tracked action

### 4. Verify events

1. Start the dev server: `npm run dev`
2. Complete a lesson or quiz in the app
3. Open PostHog → **Activity** or **Live events** — you should see events within a few seconds

### Tracked events

| Event | Properties | Trigger |
|-------|------------|---------|
| `lesson_started` | `lesson_id`, `lesson_title` | User opens a lesson |
| `lesson_completed` | `lesson_id`, `lesson_title`, `xp_earned` | User finishes a lesson |
| `quiz_answered` | `lesson_id`, `question_id`, `correct` | User answers a quiz question |
| `streak_extended` | `streak` | User extends their daily streak |
| `premium_clicked` | `source` | User clicks a premium CTA (`learn_path` or `dashboard`) |

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
duolingo-style-AI-concepts-learner/
├── app/
│   ├── page.tsx              # Landing page
│   ├── learn/page.tsx        # Learning path
│   ├── lesson/[id]/page.tsx  # Lesson screen
│   ├── quiz/[id]/page.tsx    # Quiz screen
│   ├── dashboard/page.tsx    # Progress dashboard
│   └── api/generate-lesson/  # Gemini API route
├── components/               # UI components
├── lib/
│   ├── lessons.ts            # Curriculum data
│   ├── progress.ts           # localStorage progress
│   ├── posthog.ts            # PostHog init, provider & events
│   ├── gemini.ts             # Gemini client
│   └── types.ts              # TypeScript types
└── .env.example
```

## Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your `duolingo-style-AI-concepts-learner` repository
4. Add environment variables:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_POSTHOG_KEY`
   - `NEXT_PUBLIC_POSTHOG_HOST`
5. Click **Deploy**

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow prompts and add env vars when asked, or set them in the Vercel dashboard under **Settings → Environment Variables**.

## Deploy to GitHub

```bash
git add .
git commit -m "Initial commit: AIlingo MVP"
git branch -M main
git remote add origin https://github.com/sonalim611/duolingo-style-AI-concepts-learner.git
git push -u origin main
```

## XP Rules

| Action | XP |
|--------|-----|
| Complete a lesson | 15 XP |
| Correct quiz answer | 10 XP each |
| Perfect quiz (100%) | +20 XP bonus |

## License

MIT
