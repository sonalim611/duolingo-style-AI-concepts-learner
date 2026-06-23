"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProgress } from "@/lib/progress";
import { useEffect, useState } from "react";
import { UserProgress } from "@/lib/types";
import { StreakBadge, XPBadge } from "./ProgressUI";

const navItems = [
  { href: "/learn", label: "Learn", icon: "📚" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
];

export function TopBar() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    const onStorage = () => setProgress(getProgress());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🦉
          </span>
          <span className="text-xl font-extrabold text-lingo-green-dark">AIlingo</span>
        </Link>
        {progress && (
          <div className="flex items-center gap-2">
            <StreakBadge streak={progress.streak} />
            <XPBadge xp={progress.xp} />
          </div>
        )}
      </div>
    </header>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-lg">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-3 text-xs font-bold transition-colors ${
                active
                  ? "text-lingo-green-dark"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-gray-50">
      <TopBar />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
