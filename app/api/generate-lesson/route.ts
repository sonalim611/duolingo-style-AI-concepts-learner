import { NextRequest, NextResponse } from "next/server";
import { generateLessonContent } from "@/lib/gemini";
import { getLessonById } from "@/lib/lessons";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lessonId, title, description, topicHints } = body;

    const lesson = lessonId ? getLessonById(lessonId) : null;
    const lessonTitle = title ?? lesson?.title ?? "AI Concept";
    const lessonDesc = description ?? lesson?.description ?? "";
    const hints =
      topicHints ?? lesson?.sections.map((s) => s.title) ?? ["artificial intelligence"];

    const sections = await generateLessonContent(lessonTitle, lessonDesc, hints);

    return NextResponse.json({ lessonId, sections });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate lesson";
    const status = message.includes("GEMINI_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
