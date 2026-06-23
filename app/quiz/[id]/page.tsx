import { notFound } from "next/navigation";
import { AppShell } from "@/components/Navigation";
import { QuizClient } from "@/components/QuizClient";
import { getLessonById } from "@/lib/lessons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);
  return {
    title: lesson ? `Quiz: ${lesson.title} — AIlingo` : "Quiz — AIlingo",
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  return (
    <AppShell>
      <div className="mb-4">
        <h1 className="text-lg font-extrabold text-gray-800">
          {lesson.icon} Quiz: {lesson.title}
        </h1>
      </div>
      <QuizClient lesson={lesson} />
    </AppShell>
  );
}
