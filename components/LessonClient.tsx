"use client";

import { useEffect, useState } from "react";
import { Lesson, LessonSection } from "@/lib/types";
import { getProgress, saveGeneratedContent, completeLesson } from "@/lib/progress";
import {
  trackLessonStarted,
  trackLessonCompleted,
  trackStreakExtended,
} from "@/lib/posthog";
import { Button, LinkButton } from "./Button";
import { ProgressBar } from "./ProgressUI";
import { LessonContent } from "@/lib/formatContent";

interface LessonClientProps {
  lesson: Lesson;
}

export function LessonClient({ lesson }: LessonClientProps) {
  const [sections, setSections] = useState<LessonSection[]>(lesson.sections);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiEnhanced, setAiEnhanced] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    trackLessonStarted(lesson.id, lesson.title);

    const progress = getProgress();
    const cached = progress.generatedContent[lesson.id];
    if (cached?.sections?.length) {
      setSections(cached.sections);
      setAiEnhanced(true);
    }
  }, [lesson.id, lesson.title]);

  async function enhanceWithAI() {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          title: lesson.title,
          description: lesson.description,
          topicHints: lesson.sections.map((s) => s.title),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.sections?.length) {
          setSections(data.sections);
          setAiEnhanced(true);
          saveGeneratedContent({
            lessonId: lesson.id,
            sections: data.sections,
            generatedAt: new Date().toISOString(),
          });
        }
      }
    } catch {
      // Keep static content on failure
    } finally {
      setLoading(false);
    }
  }

  function handleComplete() {
    const { streakExtended, xpEarned } = completeLesson(lesson.id);
    trackLessonCompleted(lesson.id, lesson.title, xpEarned);
    if (streakExtended) {
      const progress = getProgress();
      trackStreakExtended(progress.streak);
    }
    setCompleted(true);
  }

  const isLastStep = step >= sections.length - 1;
  const current = sections[step];

  if (completed) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="text-6xl" aria-hidden>
          🎉
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">Lesson Complete!</h1>
        <p className="text-gray-600">
          Great job finishing <strong>{lesson.title}</strong>. Ready for the quiz?
        </p>
        <LinkButton href={`/quiz/${lesson.id}`} fullWidth size="lg">
          Start Quiz
        </LinkButton>
        <LinkButton href="/learn" variant="outline" fullWidth>
          Back to Path
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-gray-500">
          <span>
            Step {step + 1} of {sections.length}
          </span>
          {aiEnhanced && (
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
              ✨ AI Enhanced
            </span>
          )}
        </div>
        <ProgressBar value={step + 1} max={sections.length} />
      </div>

      <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 text-4xl" aria-hidden>
          {lesson.icon}
        </div>
        <h1 className="mb-4 text-xl font-extrabold text-gray-800">{current.title}</h1>
        <LessonContent content={current.content} />
      </div>

      {!aiEnhanced && (
        <Button
          variant="outline"
          fullWidth
          onClick={enhanceWithAI}
          disabled={loading}
        >
          {loading ? "Generating with Gemini..." : "✨ Enhance with AI"}
        </Button>
      )}

      <div className="flex gap-3">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
            Back
          </Button>
        )}
        {!isLastStep ? (
          <Button onClick={() => setStep(step + 1)} className="flex-1">
            Continue
          </Button>
        ) : (
          <Button onClick={handleComplete} className="flex-1">
            Complete Lesson
          </Button>
        )}
      </div>
    </div>
  );
}
