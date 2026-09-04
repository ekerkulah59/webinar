import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { BookingInput, MeetingMode } from "@/lib/appointments";

// Phone is conditionally required: we can't call someone without a number, but
// a video booker shouldn't be forced to hand one over.
const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    meetingMode: z.enum(["video", "phone"]),
    phone: z.string().optional(),
    topic: z.string().max(500, "Keep it under 500 characters").optional(),
    website: z.string().optional(), // honeypot
  })
  .refine(
    v =>
      v.meetingMode !== "phone" ||
      /^\+?[\d\s().-]{7,20}$/.test(v.phone?.trim() ?? ""),
    { path: ["phone"], message: "A phone number is required for a phone call" }
  );

type FormValues = z.infer<typeof schema>;

type BookingFormProps = {
  onSubmit: (input: Omit<BookingInput, "startsAt">) => Promise<void>;
  submitting: boolean;
  error: string | null;
};

const MEETING_MODES: {
  value: MeetingMode;
  label: string;
  hint: string;
}[] = [
  {
    value: "video",
    label: "Video call",
    hint: "We'll send you a link",
  },
  {
    value: "phone",
    label: "Phone call",
    hint: "We'll call you",
  },
];

export function BookingForm({ onSubmit, submitting, error }: BookingFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      meetingMode: "video",
      phone: "",
      topic: "",
      website: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const meetingMode = watch("meetingMode");

  const submit = async (values: FormValues) => {
    if (values.website) return; // bot
    await onSubmit({
      name: values.name,
      email: values.email,
      meetingMode: values.meetingMode,
      phone: values.meetingMode === "phone" ? values.phone : undefined,
      topic: values.topic,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5" noValidate>
      {/* Honeypot — hidden from users, bots often fill it */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <div className="space-y-2">
        <Label htmlFor="booking-name">
          Full name <span aria-hidden="true">*</span>
        </Label>
        <Input
          id="booking-name"
          autoComplete="name"
          disabled={submitting}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-email">
          Email <span aria-hidden="true">*</span>
        </Label>
        <Input
          id="booking-email"
          type="email"
          autoComplete="email"
          disabled={submitting}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Your confirmation and calendar invite go here.
        </p>
      </div>

      <div className="space-y-2">
        <Label>How should we meet?</Label>
        <RadioGroup
          value={meetingMode}
          onValueChange={value =>
            setValue("meetingMode", value as MeetingMode, {
              shouldValidate: true,
            })
          }
          className="grid gap-3 sm:grid-cols-2"
        >
          {MEETING_MODES.map(({ value, label, hint }) => (
            <Label
              key={value}
              htmlFor={`mode-${value}`}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
                meetingMode === value
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-accent/50"
              )}
            >
              <RadioGroupItem
                value={value}
                id={`mode-${value}`}
                className="mt-1"
              />
              <span className="space-y-0.5">
                <span className="font-medium text-foreground">{label}</span>
                <span className="block text-xs font-normal text-muted-foreground">
                  {hint}
                </span>
              </span>
            </Label>
          ))}
        </RadioGroup>
      </div>

      {meetingMode === "phone" && (
        <div className="space-y-2">
          <Label htmlFor="booking-phone">
            Phone <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="booking-phone"
            type="tel"
            autoComplete="tel"
            disabled={submitting}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="booking-topic">
          What would you like to talk about?{" "}
          <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="booking-topic"
          rows={3}
          placeholder="Tell us what you want to learn, improve, or help your team accomplish."
          disabled={submitting}
          {...register("topic")}
        />
        {errors.topic && (
          <p className="text-xs text-destructive">{errors.topic.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full font-semibold"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Booking…
          </>
        ) : (
          "Confirm Appointment"
        )}
      </Button>
    </form>
  );
}
