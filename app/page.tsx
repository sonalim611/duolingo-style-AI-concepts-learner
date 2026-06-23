import { LinkButton } from "@/components/Button";

const features = [
  {
    icon: "📚",
    title: "Bite-sized Lessons",
    description: "Learn AI concepts in 5-minute lessons designed for busy schedules.",
  },
  {
    icon: "✨",
    title: "AI-Powered Content",
    description: "Gemini generates personalized explanations tailored to your level.",
  },
  {
    icon: "🎯",
    title: "Interactive Quizzes",
    description: "Test your knowledge with MCQs and instant feedback.",
  },
  {
    icon: "🔥",
    title: "Streaks & XP",
    description: "Stay motivated with daily streaks and experience points.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="mx-auto flex w-full max-w-lg items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl" aria-hidden>
            🦉
          </span>
          <span className="text-2xl font-extrabold text-lingo-green-dark">AIlingo</span>
        </div>
        <LinkButton href="/learn" size="sm">
          Start
        </LinkButton>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pb-12">
        <section className="py-10 text-center">
          <div className="mb-6 text-7xl" aria-hidden>
            🤖
          </div>
          <h1 className="mb-4 text-4xl font-black leading-tight text-gray-800">
            Learn AI.
            <br />
            <span className="text-lingo-green">One lesson at a time.</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            AIlingo makes artificial intelligence approachable with fun, Duolingo-style
            lessons — no PhD required.
          </p>
          <div className="flex flex-col gap-3">
            <LinkButton href="/learn" fullWidth size="lg">
              Get Started — It&apos;s Free
            </LinkButton>
            <LinkButton href="/dashboard" variant="outline" fullWidth>
              View Dashboard
            </LinkButton>
          </div>
        </section>

        <section className="mt-4 grid gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-5"
            >
              <div className="mb-2 text-3xl" aria-hidden>
                {f.icon}
              </div>
              <h2 className="mb-1 font-extrabold text-gray-800">{f.title}</h2>
              <p className="text-sm text-gray-600">{f.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl bg-lingo-green-light p-6 text-center">
          <h2 className="mb-2 text-xl font-extrabold text-lingo-green-dark">
            Ready to level up?
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            Join thousands learning ML, LLMs, prompt engineering, and AI ethics.
          </p>
          <LinkButton href="/learn" fullWidth>
            Start Learning Now
          </LinkButton>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AIlingo. Built with Next.js & Gemini.
      </footer>
    </div>
  );
}
