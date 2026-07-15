import { prisma } from '../../app/config/database.js';
import { computeStreaks } from '../../shared/streaks.js';

export const analyticsService = {
  async getDashboard(userId: string) {
    const [
      books,
      completedBooks,
      readingBooks,
      totalSessions,
      pagesResult,
      minutesResult,
      readingDates,
      journalCount,
      completedGoals,
      pendingGoals,
      completedTasks,
      pendingTasks,
      habitsWithLogs,
    ] = await Promise.all([
      prisma.book.count({ where: { userId } }),
      prisma.book.count({ where: { userId, status: 'completed' } }),
      prisma.book.count({ where: { userId, status: 'reading' } }),
      prisma.readingSession.count({ where: { userId } }),
      prisma.readingSession.aggregate({ where: { userId }, _sum: { pagesRead: true } }),
      prisma.readingSession.aggregate({ where: { userId }, _sum: { durationMinutes: true } }),
      prisma.readingSession.findMany({ where: { userId }, select: { date: true } }),
      prisma.journalEntry.count({ where: { userId } }),
      prisma.goal.count({ where: { userId, status: 'COMPLETED' } }),
      prisma.goal.count({ where: { userId, status: { in: ['NOT_STARTED', 'IN_PROGRESS'] } } }),
      prisma.task.count({ where: { userId, status: 'DONE' } }),
      prisma.task.count({ where: { userId, status: { not: 'DONE' } } }),
      prisma.habit.findMany({ where: { userId }, include: { logs: true } }),
    ]);

    const streak = computeStreaks(readingDates.map((r) => r.date));

    let totalLogs = 0;
    let completedLogs = 0;
    for (const habit of habitsWithLogs) {
      totalLogs += habit.logs.length;
      completedLogs += habit.logs.filter((l) => l.completed).length;
    }
    const habitCompletionRate = totalLogs > 0 ? Math.round((completedLogs / totalLogs) * 100) : 0;

    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setUTCHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    monthStart.setUTCHours(0, 0, 0, 0);

    const [weeklyActivities, monthlyActivities] = await Promise.all([
      prisma.activity.findMany({
        where: { userId, createdAt: { gte: weekStart, lt: weekEnd } },
        select: { createdAt: true },
      }),
      prisma.activity.findMany({
        where: { userId, createdAt: { gte: monthStart } },
        select: { createdAt: true },
      }),
    ]);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyActivity: Record<string, number> = {};
    for (const d of dayNames) weeklyActivity[d] = 0;
    for (const a of weeklyActivities) {
      const day = dayNames[a.createdAt.getDay()];
      weeklyActivity[day] = (weeklyActivity[day] || 0) + 1;
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyActivity: Record<string, number> = {};
    for (const a of monthlyActivities) {
      const key = monthNames[a.createdAt.getMonth()];
      monthlyActivity[key] = (monthlyActivity[key] || 0) + 1;
    }

    return {
      totalBooks: books,
      completedBooks,
      readingBooks,
      totalReadingSessions: totalSessions,
      totalPagesRead: pagesResult._sum.pagesRead ?? 0,
      totalReadingMinutes: minutesResult._sum.durationMinutes ?? 0,
      currentReadingStreak: streak.currentStreak,
      longestReadingStreak: streak.longestStreak,
      journalEntries: journalCount,
      completedGoals,
      pendingGoals,
      completedTasks,
      pendingTasks,
      habitCompletionRate,
      weeklyActivity,
      monthlyActivity,
    };
  },

  async getReadingStats(userId: string) {
    const [books, sessions] = await Promise.all([
      prisma.book.findMany({ where: { userId } }),
      prisma.readingSession.findMany({ where: { userId }, orderBy: { date: 'asc' } }),
    ]);

    const statusCounts: Record<string, number> = {};
    for (const b of books) {
      statusCounts[b.status] = (statusCounts[b.status] || 0) + 1;
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const pagesByMonth: Record<string, number> = {};
    const minutesByMonth: Record<string, number> = {};
    for (const s of sessions) {
      const key = monthNames[s.date.getMonth()];
      pagesByMonth[key] = (pagesByMonth[key] || 0) + s.pagesRead;
      minutesByMonth[key] = (minutesByMonth[key] || 0) + s.durationMinutes;
    }

    return {
      totalBooks: books.length,
      booksByStatus: statusCounts,
      totalSessions: sessions.length,
      totalPagesRead: sessions.reduce((s, r) => s + r.pagesRead, 0),
      totalReadingMinutes: sessions.reduce((s, r) => s + r.durationMinutes, 0),
      pagesByMonth,
      minutesByMonth,
    };
  },

  async getGoalsStats(userId: string) {
    const goals = await prisma.goal.findMany({ where: { userId } });

    const statusCounts: Record<string, number> = {};
    const priorityCounts: Record<string, number> = {};
    for (const g of goals) {
      statusCounts[g.status] = (statusCounts[g.status] || 0) + 1;
      priorityCounts[g.priority] = (priorityCounts[g.priority] || 0) + 1;
    }

    const totalProgress = goals.reduce((s, g) => s + g.progress, 0);
    const avgProgress = goals.length > 0 ? Math.round(totalProgress / goals.length) : 0;

    return {
      totalGoals: goals.length,
      goalsByStatus: statusCounts,
      goalsByPriority: priorityCounts,
      averageProgress: avgProgress,
      completedCount: statusCounts['COMPLETED'] || 0,
      inProgressCount: statusCounts['IN_PROGRESS'] || 0,
      notStartedCount: statusCounts['NOT_STARTED'] || 0,
    };
  },

  async getTasksStats(userId: string) {
    const tasks = await prisma.task.findMany({ where: { userId } });

    const statusCounts: Record<string, number> = {};
    const priorityCounts: Record<string, number> = {};
    for (const t of tasks) {
      statusCounts[t.status] = (statusCounts[t.status] || 0) + 1;
      priorityCounts[t.priority] = (priorityCounts[t.priority] || 0) + 1;
    }

    return {
      totalTasks: tasks.length,
      tasksByStatus: statusCounts,
      tasksByPriority: priorityCounts,
      completedCount: statusCounts['DONE'] || 0,
      todoCount: statusCounts['TODO'] || 0,
      inProgressCount: statusCounts['IN_PROGRESS'] || 0,
      completionRate: tasks.length > 0 ? Math.round(((statusCounts['DONE'] || 0) / tasks.length) * 100) : 0,
    };
  },

  async getHabitsStats(userId: string) {
    const habits = await prisma.habit.findMany({
      where: { userId },
      include: { logs: true },
    });

    let totalLogs = 0;
    let completedLogs = 0;
    const logsByHabit: Array<{ name: string; total: number; completed: number; rate: number }> = [];

    const allDates: Date[] = [];
    for (const h of habits) {
      const hCompleted = h.logs.filter((l) => l.completed).length;
      totalLogs += h.logs.length;
      completedLogs += hCompleted;
      logsByHabit.push({
        name: h.name,
        total: h.logs.length,
        completed: hCompleted,
        rate: h.logs.length > 0 ? Math.round((hCompleted / h.logs.length) * 100) : 0,
      });
      for (const l of h.logs) {
        if (l.completed) allDates.push(l.date);
      }
    }

    const streak = computeStreaks(allDates);

    return {
      totalHabits: habits.length,
      totalLogs,
      completedLogs,
      overallCompletionRate: totalLogs > 0 ? Math.round((completedLogs / totalLogs) * 100) : 0,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      habitsBreakdown: logsByHabit,
    };
  },
};
