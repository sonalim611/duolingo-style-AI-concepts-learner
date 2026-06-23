"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { createElement, useEffect } from "react";

let initialized = false;

export function initPostHog(): void {
  if (typeof window === "undefined" || initialized) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!key) return;

  posthog.init(key, {
    api_host: host || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
  });

  initialized = true;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return createElement(PHProvider, { client: posthog }, children);
}

type EventProperties = Record<string, string | number | boolean | undefined>;

function capture(event: string, properties?: EventProperties): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture(event, properties);
}

export function trackLessonStarted(lessonId: string, title: string): void {
  capture("lesson_started", { lesson_id: lessonId, lesson_title: title });
}

export function trackLessonCompleted(
  lessonId: string,
  title: string,
  xpEarned: number
): void {
  capture("lesson_completed", {
    lesson_id: lessonId,
    lesson_title: title,
    xp_earned: xpEarned,
  });
}

export function trackQuizAnswered(
  lessonId: string,
  questionId: string,
  correct: boolean
): void {
  capture("quiz_answered", {
    lesson_id: lessonId,
    question_id: questionId,
    correct,
  });
}

export function trackStreakExtended(streak: number): void {
  capture("streak_extended", { streak });
}

export function trackPremiumClicked(source: string): void {
  capture("premium_clicked", { source });
}
