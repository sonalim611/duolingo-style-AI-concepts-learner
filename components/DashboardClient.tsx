"use client";

import { useEffect, useState } from "react";
import { UserProgress } from "@/lib/types";
import { getProgress, getAccuracy } from "@/lib/progress";
import { LESSONS } from "@/lib/lessons";
import { AppShell } from "@/components/Navigation";
import { StatCard, ProgressBar } from "@/components/ProgressUI";
import { Button, LinkButton } from "@/components/Button";

export function DashboardClient() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) {
    return (
      <AppShell>
        <div className="py-12 text-center text-gray-500">Loading...</div>
      </AppShell>
    );
  }

  const accuracy = getAccuracy(progress);
  const completedCount = progress.completedLessons.length;
  const totalLessons = LESSONS.length;

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-extrabold text-gray-800">Your Progress</h1>

        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total XP" value={progress.xp} icon="⚡" accent="orange" />
          <StatCard
            label="Day Streak"
            value={progress.streak}
            icon="🔥"
            accent="orange"
          />
          <StatCard
            label="Lessons Done"
            value={`${completedCount}/${totalLessons}`}
            icon="📚"
            accent="green"
          />
          <StatCard
            label="Accuracy"
            value={`${accuracy}%`}
            icon="🎯"
            accent="blue"
          />
        </div>

        <div className="rounded-2xl border-2 border-gray-200 bg-white p-5">
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>Course Progress</span>
            <span className="text-lingo-green-dark">
              {Math.round((completedCount / totalLessons) * 100)}%
            </span>
          </div>
          <ProgressBar value={completedCount} max={totalLessons} />
        </div>

        <div className="rounded-2xl border-2 border-gray-200 bg-white p-5">
          <h2 className="mb-3 font-extrabold text-gray-800">Completed Lessons</h2>
          {completedCount === 0 ? (
            <p className="text-sm text-gray-500">
              No lessons completed yet. Start learning to earn XP!
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {progress.completedLessons.map((id) => {
                const lesson = LESSONS.find((l) => l.id === id);
                const quiz = progress.quizResults.find((r) => r.lessonId === id);
                return (
                  <li
                    key={id}
                    className="flex items-center justify-between rounded-xl bg-lingo-green-light px-3 py-2"
                  >
                    <span className="font-semibold text-gray-800">
                      {lesson?.icon} {lesson?.title ?? id}
                    </span>
                    {quiz && (
                      <span className="text-sm font-bold text-lingo-green-dark">
                        {quiz.correct}/{quiz.total}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <LinkButton href="/learn" fullWidth size="lg">
          Back to Learning
        </LinkButton>

        <Button
          variant="outline"
          fullWidth
          onClick={() => {
            localStorage.removeItem("ailingo_progress");
            setProgress(getProgress());
          }}
        >
          Reset Progress
        </Button>
      </div>
    </AppShell>
  );
}
