export function XPBadge({ xp }: { xp: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700">
      <span aria-hidden>⚡</span>
      <span>{xp} XP</span>
    </div>
  );
}

export function StreakBadge({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-600">
      <span aria-hidden>🔥</span>
      <span>{streak}</span>
    </div>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full rounded-full bg-lingo-green transition-all duration-500"
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  accent = "green",
}: {
  label: string;
  value: string | number;
  icon: string;
  accent?: "green" | "blue" | "orange" | "purple";
}) {
  const accents = {
    green: "border-lingo-green/30 bg-lingo-green-light",
    blue: "border-sky-400/30 bg-sky-50",
    orange: "border-orange-400/30 bg-orange-50",
    purple: "border-purple-400/30 bg-purple-50",
  };

  return (
    <div
      className={`rounded-2xl border-2 p-4 ${accents[accent]}`}
    >
      <div className="mb-1 text-2xl" aria-hidden>
        {icon}
      </div>
      <div className="text-2xl font-extrabold text-gray-800">{value}</div>
      <div className="text-sm font-semibold text-gray-500">{label}</div>
    </div>
  );
}
