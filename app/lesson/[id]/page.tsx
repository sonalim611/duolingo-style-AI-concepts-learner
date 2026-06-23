import { notFound } from "next/navigation";
import { AppShell } from "@/components/Navigation";
import { LessonClient } from "@/components/LessonClient";
import { getLessonById } from "@/lib/lessons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);
  return { title: lesson ? `${lesson.title} — AIlingo` : "Lesson — AIlingo" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLessonById(id);
  if (!lesson) notFound();

  return (
    <AppShell>
      <LessonClient lesson={lesson} />
    </AppShell>
  );
}
