import type { DayHours } from '../data/site';

export interface OpenStatus {
  isOpen: boolean;
  /** e.g. "Open now · closes 4:30pm" or "Closed · opens 8:30am" */
  label: string;
}

/** Parses "HH:MM" into minutes since midnight. */
function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Formats minutes-since-midnight as "8:30am" / "4:30pm" / "12:00pm". */
export function formatMinutes(minutes: number): string {
  let h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const period = h >= 12 ? 'pm' : 'am';
  h = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h}${period}` : `${h}:${String(m).padStart(2, '0')}${period}`;
}

/** Formats an "HH:MM" string as "8:30am". */
export function formatTimeString(time: string): string {
  return formatMinutes(toMinutes(time));
}

/**
 * Returns the current weekday (0=Sun..6=Sat) and minutes-since-midnight
 * for the given timezone, independent of the server/browser's local zone.
 */
function getLocalParts(date: Date, timeZone: string): { weekday: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let weekday = 0;
  let hour = 0;
  let minute = 0;

  for (const part of parts) {
    if (part.type === 'weekday') weekday = weekdayMap[part.value] ?? 0;
    if (part.type === 'hour') hour = Number(part.value);
    if (part.type === 'minute') minute = Number(part.value);
  }

  return { weekday, minutes: hour * 60 + minute };
}

/**
 * Computes live open/closed status from weekly hours, evaluated in the
 * given IANA timezone (defaults to Europe/London) at the given instant.
 */
export function getOpenStatus(hours: readonly DayHours[], timezone: string, now: Date = new Date()): OpenStatus {
  const { weekday, minutes } = getLocalParts(now, timezone);
  const today = hours.find((h) => h.day === weekday);

  if (today && today.opens !== null && today.closes !== null) {
    const opens = toMinutes(today.opens);
    const closes = toMinutes(today.closes);

    if (minutes >= opens && minutes < closes) {
      return { isOpen: true, label: `Open now · closes ${formatMinutes(closes)}` };
    }

    if (minutes < opens) {
      return { isOpen: false, label: `Closed · opens ${formatMinutes(opens)}` };
    }
  }

  // Past closing (or closed all day) — find the next day with hours.
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (weekday + offset) % 7;
    const next = hours.find((h) => h.day === nextDay);
    if (next && next.opens !== null) {
      const prefix = offset === 1 ? 'opens tomorrow' : `opens ${next.label}`;
      return { isOpen: false, label: `Closed · ${prefix} ${formatMinutes(toMinutes(next.opens))}` };
    }
  }

  return { isOpen: false, label: 'Closed' };
}
