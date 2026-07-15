export function computeStreaks(dates: Date[]): { currentStreak: number; longestStreak: number } {
  if (dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const uniqueDays = [...new Set(dates.map((d) => {
    const date = new Date(d);
    date.setUTCHours(0, 0, 0, 0);
    return date.getTime();
  }))].sort((a, b) => b - a);

  const DAY_MS = 86400000;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayMs = today.getTime();

  const latestLogMs = uniqueDays[0];
  const diffFromToday = Math.round((todayMs - latestLogMs) / DAY_MS);

  let currentStreak = 0;
  if (diffFromToday <= 1) {
    currentStreak = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      const prev = uniqueDays[i - 1];
      const curr = uniqueDays[i];
      if (Math.round((prev - curr) / DAY_MS) === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  let longestStreak = uniqueDays.length > 0 ? 1 : 0;
  let tempStreak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = uniqueDays[i - 1];
    const curr = uniqueDays[i];
    if (Math.round((prev - curr) / DAY_MS) === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return { currentStreak, longestStreak };
}

export function computeCompletionPercentage(logs: Array<{ completed: boolean }>): number {
  if (logs.length === 0) return 0;
  return Math.round((logs.filter((l) => l.completed).length / logs.length) * 100);
}
