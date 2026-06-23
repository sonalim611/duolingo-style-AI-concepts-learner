import { GoogleGenerativeAI } from "@google/generative-ai";
import { LessonSection } from "./types";

const MODEL = "gemini-2.5-flash-lite";

export function getGeminiClient(): GoogleGenerativeAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

export async function generateLessonContent(
  title: string,
  description: string,
  topicHints: string[]
): Promise<LessonSection[]> {
  const client = getGeminiClient();
  if (!client) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = client.getGenerativeModel({ model: MODEL });

  const prompt = `You are an expert AI educator creating beginner-friendly lesson content for an app called AIlingo (similar to Duolingo but for AI concepts).

Lesson title: "${title}"
Description: "${description}"
Key topics to cover: ${topicHints.join(", ")}

Generate exactly 3 lesson sections. Each section should have a clear title and 2-3 short paragraphs of engaging, simple explanations with real-world examples. Avoid jargon without explanation. Use plain text only — do not use markdown, asterisks, or other formatting symbols in the content.

Respond ONLY with valid JSON in this exact format (no markdown, no code fences):
[
  {"title": "Section Title", "content": "Section content with paragraphs separated by \\n\\n"},
  {"title": "Section Title", "content": "..."},
  {"title": "Section Title", "content": "..."}
]`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  const cleaned = text.replace(/^```json\s*/i, "").replace(/```\s*$/i, "");
  const parsed = JSON.parse(cleaned) as LessonSection[];

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid lesson content from Gemini");
  }

  return parsed.map((s) => ({
    title: String(s.title),
    content: String(s.content),
  }));
}
