export const toDateString = (date: Date): string =>
  date.toISOString().split('T')[0];

export const todayString = (): string => toDateString(new Date());

export const formatDisplayDate = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatShortDate = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getLast7Days = (): string[] => {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(toDateString(d));
  }
  return days;
};

export const getLast30Days = (): string[] => {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(toDateString(d));
  }
  return days;
};

export const getLast12Weeks = (): string[][] => {
  const weeks: string[][] = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfCurrentWeek = new Date(today);
  startOfCurrentWeek.setDate(today.getDate() - dayOfWeek);

  for (let w = 11; w >= 0; w--) {
    const weekDays: string[] = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(startOfCurrentWeek);
      day.setDate(startOfCurrentWeek.getDate() - w * 7 + d);
      weekDays.push(toDateString(day));
    }
    weeks.push(weekDays);
  }
  return weeks;
};

export const getWeekLabel = (weekDays: string[]): string => {
  if (weekDays.length === 0) return '';
  return formatShortDate(weekDays[0]);
};

export const isToday = (dateStr: string): boolean => dateStr === todayString();

export const diffInDays = (a: string, b: string): number => {
  const dateA = new Date(a + 'T00:00:00');
  const dateB = new Date(b + 'T00:00:00');
  return Math.round((dateA.getTime() - dateB.getTime()) / 86_400_000);
};
