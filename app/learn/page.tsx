import { AppShell } from "@/components/Navigation";
import { LessonNode, PremiumBanner } from "@/components/LessonPath";
import { getUnits } from "@/lib/lessons";

export const metadata = {
  title: "Learn — AIlingo",
};

export default function LearnPage() {
  const units = getUnits();

  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Learning Path</h1>
          <p className="text-sm text-gray-500">
            Complete lessons in order to unlock the next one
          </p>
        </div>

        {units.map((unit) => (
          <section key={unit.unit}>
            <div className="mb-4 rounded-xl bg-lingo-green px-4 py-2">
              <h2 className="font-extrabold text-white">
                Unit {unit.unit}: {unit.title}
              </h2>
            </div>
            <div className="flex flex-col items-center">
              {unit.lessons.map((lesson, i) => (
                <LessonNode
                  key={lesson.id}
                  lesson={lesson}
                  isLast={i === unit.lessons.length - 1}
                />
              ))}
            </div>
          </section>
        ))}

        <PremiumBanner />
      </div>
    </AppShell>
  );
}
