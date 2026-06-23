import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/lib/posthog";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AIlingo — Learn AI Concepts the Fun Way",
  description:
    "Master artificial intelligence through bite-sized lessons, quizzes, and streaks. Duolingo-style learning for AI.",
  openGraph: {
    title: "AIlingo — Learn AI Concepts the Fun Way",
    description: "Bite-sized AI lessons with quizzes, XP, and daily streaks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} h-full`}>
      <body className="min-h-full antialiased">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
