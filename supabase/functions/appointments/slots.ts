// Availability computation.
//
// A slot is bookable only if it survives every filter here. The same function
// serves both the `slots` listing and the re-validation inside `book`, so a
// client cannot talk us into a slot the listing would never have offered.
//
// Timezone handling is the subtle part. Rules are stored as wall-clock time
// ("13:00 on Tuesdays") in the owner's timezone, because that's what a human
// means by their working hours — 1pm stays 1pm across a DST change even though
// the UTC instant shifts by an hour. TZDate does that conversion correctly;
// hand-rolled offset math is where scheduling code usually goes wrong.

import { TZDate } from "npm:@date-fns/tz@1";
import type { BusyRange } from "./google.ts";

export type Rule = {
  weekday: number;
  start_time: string; // "13:00:00"
  end_time: string; // "17:00:00"
};

export type Interval = { start: number; end: number }; // epoch ms

export type Slot = { startsAt: string; endsAt: string }; // ISO 8601, UTC

export type ComputeSlotsInput = {
  rules: Rule[];
  busy: BusyRange[];
  blackouts: Interval[];
  booked: Interval[];
  from: Date;
  to: Date;
  now: Date;
  timeZone: string;
  slotMinutes: number;
  bufferMinutes: number;
  minNoticeHours: number;
  maxAdvanceDays: number;
};

const MS_PER_MINUTE = 60_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_DAY = 86_400_000;

/** Calendar Y/M/D as seen in `timeZone` at the given instant. */
function localDateParts(date: Date, timeZone: string) {
  const zoned = new TZDate(date.getTime(), timeZone);
  return {
    year: zoned.getFullYear(),
    month: zoned.getMonth(), // 0-indexed
    day: zoned.getDate(),
  };
}

function parseTime(value: string): { hour: number; minute: number } {
  const [hour, minute] = value.split(":");
  return { hour: Number(hour), minute: Number(minute) };
}

function overlaps(a: Interval, b: Interval): boolean {
  return a.start < b.end && b.start < a.end;
}

/**
 * Bookable slots between `from` and `to`, in chronological order.
 *
 * Filters applied, in order: recurring rules → minimum notice → maximum advance
 * → Google Calendar busy ranges (padded by the buffer) → blackouts → existing
 * confirmed appointments.
 */
export function computeSlots(input: ComputeSlotsInput): Slot[] {
  const {
    rules,
    busy,
    blackouts,
    booked,
    from,
    to,
    now,
    timeZone,
    slotMinutes,
    bufferMinutes,
    minNoticeHours,
    maxAdvanceDays,
  } = input;

  const slotMs = slotMinutes * MS_PER_MINUTE;
  const bufferMs = bufferMinutes * MS_PER_MINUTE;
  const earliest = now.getTime() + minNoticeHours * MS_PER_HOUR;
  const latest = now.getTime() + maxAdvanceDays * MS_PER_DAY;

  // Google busy ranges get padded on both sides so you aren't booked with zero
  // gap either side of an existing meeting. Blackouts and existing appointments
  // are not padded — they're already exactly the window to protect.
  const blocked: Interval[] = [
    ...busy.map((b) => ({
      start: new Date(b.start).getTime() - bufferMs,
      end: new Date(b.end).getTime() + bufferMs,
    })),
    ...blackouts,
    ...booked,
  ];

  const rulesByWeekday = new Map<number, Rule[]>();
  for (const rule of rules) {
    const list = rulesByWeekday.get(rule.weekday) ?? [];
    list.push(rule);
    rulesByWeekday.set(rule.weekday, list);
  }

  const slots: Slot[] = [];
  const endParts = localDateParts(to, timeZone);
  // Anchor at UTC noon so that adding 24h always advances exactly one calendar
  // day, regardless of DST shifts near midnight.
  const lastCursor = Date.UTC(endParts.year, endParts.month, endParts.day, 12);

  const startParts = localDateParts(from, timeZone);
  let cursor = Date.UTC(startParts.year, startParts.month, startParts.day, 12);

  while (cursor <= lastCursor) {
    const cursorDate = new Date(cursor);
    const year = cursorDate.getUTCFullYear();
    const month = cursorDate.getUTCMonth();
    const day = cursorDate.getUTCDate();

    // Weekday of this calendar date as it falls in the owner's timezone.
    const weekday = new TZDate(year, month, day, 12, 0, 0, 0, timeZone).getDay();

    for (const rule of rulesByWeekday.get(weekday) ?? []) {
      const start = parseTime(rule.start_time);
      const end = parseTime(rule.end_time);

      const windowStart = new TZDate(
        year, month, day, start.hour, start.minute, 0, 0, timeZone
      ).getTime();
      const windowEnd = new TZDate(
        year, month, day, end.hour, end.minute, 0, 0, timeZone
      ).getTime();

      for (let t = windowStart; t + slotMs <= windowEnd; t += slotMs) {
        const slot: Interval = { start: t, end: t + slotMs };

        if (slot.start < earliest) continue;
        if (slot.start > latest) continue;
        if (slot.start < from.getTime() || slot.end > to.getTime()) continue;
        if (blocked.some((b) => overlaps(slot, b))) continue;

        slots.push({
          startsAt: new Date(slot.start).toISOString(),
          endsAt: new Date(slot.end).toISOString(),
        });
      }
    }

    cursor += MS_PER_DAY;
  }

  // Multiple overlapping rules on one weekday could emit the same slot twice.
  const seen = new Set<string>();
  return slots
    .filter((s) => (seen.has(s.startsAt) ? false : seen.add(s.startsAt)))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
