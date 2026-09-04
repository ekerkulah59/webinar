import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeZoneOptions } from "@/lib/appointments";

type TimezoneSelectProps = {
  value: string;
  onChange: (timeZone: string) => void;
};

/** Human label with the current offset, e.g. "New York (GMT-4)". */
function label(timeZone: string): string {
  const city = timeZone.split("/").pop()?.replace(/_/g, " ") ?? timeZone;
  try {
    const offset = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value;
    return offset ? `${city} (${offset})` : city;
  } catch {
    return city;
  }
}

/**
 * Times are always shown in the visitor's zone, defaulted from the browser.
 * The zone is named explicitly rather than implied, so nobody shows up an hour off.
 */
export function TimezoneSelect({ value, onChange }: TimezoneSelectProps) {
  const options = timeZoneOptions();

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="h-9 w-auto min-w-[200px] text-sm"
          aria-label="Time zone"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((tz) => (
            <SelectItem key={tz} value={tz}>
              {label(tz)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
