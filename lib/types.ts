export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonSection {
  title: string;
  content: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  unit: number;
  order: number;
  icon: string;
  estimatedMinutes: number;
  sections: LessonSection[];
  quiz: QuizQuestion[];
}

export interface QuizResult {
  lessonId: string;
  correct: number;
  total: number;
  answeredAt: string;
}

export interface UserProgress {
  xp: number;
  streak: number;
  lastActivityDate: string | null;
  completedLessons: string[];
  quizResults: QuizResult[];
  generatedContent: Record<string, GeneratedLessonContent>;
}

export interface GeneratedLessonContent {
  lessonId: string;
  sections: LessonSection[];
  generatedAt: string;
}

export const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  streak: 0,
  lastActivityDate: null,
  completedLessons: [],
  quizResults: [],
  generatedContent: {},
};

export const XP_LESSON_COMPLETE = 15;
export const XP_QUIZ_CORRECT = 10;
export const XP_PERFECT_QUIZ_BONUS = 20;
