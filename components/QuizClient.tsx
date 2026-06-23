"use client";

import { useState } from "react";
import { Lesson } from "@/lib/types";
import { getProgress, recordQuizResult } from "@/lib/progress";
import { trackQuizAnswered, trackStreakExtended } from "@/lib/posthog";
import { Button, LinkButton } from "./Button";
import { ProgressBar } from "./ProgressUI";

interface QuizClientProps {
  lesson: Lesson;
}

export function QuizClient({ lesson }: QuizClientProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const question = lesson.quiz[questionIndex];
  const isCorrect = selected === question.correctIndex;

  function handleSelect(index: number) {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
    const correct = index === question.correctIndex;
    trackQuizAnswered(lesson.id, question.id, correct);
    if (correct) setCorrectCount((c) => c + 1);
  }

  function handleFinish(finalCorrect: number) {
    const { xpEarned: xp, streakExtended } = recordQuizResult(
      lesson.id,
      finalCorrect,
      lesson.quiz.length
    );
    if (streakExtended) {
      trackStreakExtended(getProgress().streak);
    }
    setXpEarned(xp);
    setFinished(true);
  }

  function handleNext() {
    const isLast = questionIndex >= lesson.quiz.length - 1;
    if (isLast) {
      handleFinish(correctCount);
      return;
    }
    setQuestionIndex(questionIndex + 1);
    setSelected(null);
    setShowExplanation(false);
  }

  if (finished) {
    const accuracy = Math.round((correctCount / lesson.quiz.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="text-6xl" aria-hidden>
          {accuracy === 100 ? "🏆" : accuracy >= 66 ? "⭐" : "💪"}
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">Quiz Complete!</h1>
        <p className="text-gray-600">
          You got <strong>{correctCount}</strong> out of{" "}
          <strong>{lesson.quiz.length}</strong> correct ({accuracy}%)
        </p>
        <p className="text-lg font-bold text-amber-600">+{xpEarned} XP earned</p>
        <LinkButton href="/learn" fullWidth size="lg">
          Continue Learning
        </LinkButton>
        <LinkButton href="/dashboard" variant="outline" fullWidth>
          View Dashboard
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 text-sm font-bold text-gray-500">
          Question {questionIndex + 1} of {lesson.quiz.length}
        </div>
        <ProgressBar value={questionIndex + 1} max={lesson.quiz.length} />
      </div>

      <h2 className="text-lg font-extrabold text-gray-800">{question.question}</h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          let style = "border-2 border-gray-200 bg-white hover:bg-gray-50";
          if (selected !== null) {
            if (index === question.correctIndex) {
              style = "border-2 border-lingo-green bg-lingo-green-light";
            } else if (index === selected) {
              style = "border-2 border-red-400 bg-red-50";
            } else {
              style = "border-2 border-gray-200 bg-gray-50 opacity-60";
            }
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(index)}
              disabled={selected !== null}
              className={`rounded-2xl p-4 text-left font-semibold text-gray-800 transition-all ${style} ${
                selected === null ? "active:scale-[0.98]" : ""
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div
          className={`rounded-2xl p-4 ${
            isCorrect ? "bg-lingo-green-light" : "bg-red-50"
          }`}
        >
          <p className="font-bold text-gray-800">
            {isCorrect ? "Correct! 🎉" : "Not quite!"}
          </p>
          <p className="mt-1 text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <Button fullWidth size="lg" onClick={handleNext}>
          {questionIndex < lesson.quiz.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      )}
    </div>
  );
}
