import {
  DEFAULT_PROGRESS,
  UserProgress,
  XP_LESSON_COMPLETE,
  XP_QUIZ_CORRECT,
  XP_PERFECT_QUIZ_BONUS,
  QuizResult,
  GeneratedLessonContent,
} from "./types";

const STORAGE_KEY = "ailingo_progress";

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updateStreak(progress: UserProgress): {
  progress: UserProgress;
  streakExtended: boolean;
} {
  const today = todayString();
  const yesterday = yesterdayString();
  let streakExtended = false;

  if (progress.lastActivityDate === today) {
    return { progress, streakExtended: false };
  }

  if (progress.lastActivityDate === yesterday) {
    progress.streak += 1;
    streakExtended = true;
  } else if (progress.lastActivityDate === null) {
    progress.streak = 1;
    streakExtended = true;
  } else {
    progress.streak = 1;
    streakExtended = true;
  }

  progress.lastActivityDate = today;
  return { progress, streakExtended };
}

export function completeLesson(lessonId: string): {
  progress: UserProgress;
  streakExtended: boolean;
  xpEarned: number;
} {
  const progress = getProgress();
  let xpEarned = 0;

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    xpEarned += XP_LESSON_COMPLETE;
    progress.xp += XP_LESSON_COMPLETE;
  }

  const { progress: updated, streakExtended } = updateStreak(progress);
  saveProgress(updated);

  return { progress: updated, streakExtended, xpEarned };
}

export function recordQuizResult(
  lessonId: string,
  correct: number,
  total: number
): { progress: UserProgress; streakExtended: boolean; xpEarned: number } {
  const progress = getProgress();
  let xpEarned = correct * XP_QUIZ_CORRECT;

  if (correct === total && total > 0) {
    xpEarned += XP_PERFECT_QUIZ_BONUS;
  }

  progress.xp += xpEarned;

  const existing = progress.quizResults.findIndex((r) => r.lessonId === lessonId);
  const result: QuizResult = {
    lessonId,
    correct,
    total,
    answeredAt: new Date().toISOString(),
  };

  if (existing >= 0) {
    const prev = progress.quizResults[existing];
    if (correct > prev.correct) {
      progress.quizResults[existing] = result;
    }
  } else {
    progress.quizResults.push(result);
  }

  const { progress: updated, streakExtended } = updateStreak(progress);
  saveProgress(updated);

  return { progress: updated, streakExtended, xpEarned };
}

export function saveGeneratedContent(content: GeneratedLessonContent): void {
  const progress = getProgress();
  progress.generatedContent[content.lessonId] = content;
  saveProgress(progress);
}

export function getAccuracy(progress: UserProgress): number {
  if (progress.quizResults.length === 0) return 0;
  const totalCorrect = progress.quizResults.reduce((sum, r) => sum + r.correct, 0);
  const totalQuestions = progress.quizResults.reduce((sum, r) => sum + r.total, 0);
  if (totalQuestions === 0) return 0;
  return Math.round((totalCorrect / totalQuestions) * 100);
}

export function isLessonUnlocked(
  lessonId: string,
  allLessonIds: string[]
): boolean {
  const progress = getProgress();
  const index = allLessonIds.indexOf(lessonId);
  if (index <= 0) return true;
  const prevId = allLessonIds[index - 1];
  return progress.completedLessons.includes(prevId);
}
