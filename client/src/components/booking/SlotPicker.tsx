import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatSlotTime, localDateKey, type Slot } from "@/lib/appointments";

type SlotPickerProps = {
  slots: Slot[];
  loading: boolean;
  timeZone: string;
  selected: string | null;
  onSelect: (startsAt: string) => void;
};

/**
 * Month calendar plus the times available on the chosen day.
 *
 * Dates with no bookable slots are disabled rather than hidden, so the calendar
 * reads as "these specific days are open" instead of looking broken.
 */
export function SlotPicker({
  slots,
  loading,
  timeZone,
  selected,
  onSelect,
}: SlotPickerProps) {
  // Group by the calendar date the visitor sees, which can differ from the
  // owner's date for anyone far enough east or west.
  const byDate = useMemo(() => {
    const map = new Map<string, Slot[]>();
    for (const slot of slots) {
      const key = localDateKey(slot.startsAt, timeZone);
      const list = map.get(key) ?? [];
      list.push(slot);
      map.set(key, list);
    }
    return map;
  }, [slots, timeZone]);

  const firstAvailable = useMemo(() => {
    // Array.from rather than spread: the project tsconfig sets no `target`, so
    // iterator spread doesn't typecheck.
    const keys = Array.from(byDate.keys()).sort();
    return keys[0] ?? null;
  }, [byDate]);

  const [activeDate, setActiveDate] = useState<string | null>(null);
  const currentDate =
    activeDate && byDate.has(activeDate) ? activeDate : firstAvailable;
  const daySlots = currentDate ? (byDate.get(currentDate) ?? []) : [];

  // react-day-picker works in local Date objects; parse YYYY-MM-DD as a local
  // date (not UTC) so the highlighted cell matches the label.
  const toLocalDate = (key: string) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  const toKey = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

  const availableDates = useMemo(
    () => Array.from(byDate.keys()).map(toLocalDate),
    [byDate]
  );

  if (loading) {
    return (
      <div className="grid gap-8 grid-cols-[minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)]">
        <Skeleton className="h-[320px] w-full md:w-[300px] rounded-xl" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-11 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-muted/30 px-5 py-8 text-center">
        <p className="font-medium text-foreground">
          No times available right now
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Check back soon, or email us and we&apos;ll find a time together.
        </p>
        <a
          href="mailto:theaibootcamp09@gmail.com"
          className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-4"
        >
          Email to schedule
        </a>
      </div>
    );
  }

  return (
    // minmax(0,1fr) rather than a bare column: a default `auto` grid track
    // sizes to the calendar's intrinsic width and pushes it outside the card
    // on narrow screens.
    <div className="grid gap-8 grid-cols-[minmax(0,1fr)] md:grid-cols-[auto_minmax(0,1fr)]">
      <div className="overflow-x-auto rounded-xl border border-border">
        <Calendar
          // Slightly tighter cells so the month fits a 375px screen without
          // needing to scroll; overflow-x-auto above is the safety net.
          className="[--cell-size:1.75rem] sm:[--cell-size:2rem]"
          mode="single"
          selected={currentDate ? toLocalDate(currentDate) : undefined}
          onSelect={date => {
            if (!date) return;
            const key = toKey(date);
            if (!byDate.has(key)) return;
            setActiveDate(key);
          }}
          disabled={date => !byDate.has(toKey(date))}
          modifiers={{ available: availableDates }}
          modifiersClassNames={{
            available: "font-semibold text-accent",
          }}
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">
          {currentDate
            ? new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              }).format(toLocalDate(currentDate))
            : "Pick a date"}
        </p>

        <div
          className="grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3"
          role="radiogroup"
          aria-label="Available times"
        >
          {daySlots.map(slot => {
            const isSelected = selected === slot.startsAt;
            return (
              <button
                key={slot.startsAt}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(slot.startsAt)}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background text-foreground hover:border-accent hover:bg-accent/5"
                )}
              >
                {formatSlotTime(slot.startsAt, timeZone)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
