"use client";

import Link from "next/link";
import { Lesson } from "@/lib/types";
import { getProgress, isLessonUnlocked } from "@/lib/progress";
import { getLessonIds } from "@/lib/lessons";
import { useEffect, useState } from "react";

interface LessonNodeProps {
  lesson: Lesson;
  isLast?: boolean;
}

export function LessonNode({ lesson, isLast }: LessonNodeProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    setUnlocked(isLessonUnlocked(lesson.id, getLessonIds()));
    setCompleted(progress.completedLessons.includes(lesson.id));
  }, [lesson.id]);

  const node = (
    <div
      className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 text-2xl shadow-md transition-transform ${
        completed
          ? "border-lingo-gold bg-lingo-gold text-white"
          : unlocked
            ? "border-lingo-green bg-lingo-green text-white hover:scale-105 active:scale-95"
            : "border-gray-300 bg-gray-200 text-gray-400"
      }`}
    >
      {completed ? "✓" : unlocked ? lesson.icon : "🔒"}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      {unlocked ? (
        <Link href={`/lesson/${lesson.id}`} aria-label={`Start lesson: ${lesson.title}`}>
          {node}
        </Link>
      ) : (
        <div aria-label={`Locked: ${lesson.title}`}>{node}</div>
      )}
      <p
        className={`mt-2 max-w-[100px] text-center text-xs font-bold leading-tight ${
          unlocked ? "text-gray-700" : "text-gray-400"
        }`}
      >
        {lesson.title}
      </p>
      {!isLast && (
        <div className="my-2 h-8 w-1 rounded-full bg-gray-300" aria-hidden />
      )}
    </div>
  );
}
