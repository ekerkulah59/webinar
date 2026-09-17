import { useForm } from "react-hook-form";
import { Link } from "wouter";
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
    topic: z.string().max(450, "Keep it under 450 characters").optional(),
    audience: z.enum(["owner", "organization"]),
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
  videoAvailable?: boolean;
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

export function BookingForm({
  onSubmit,
  submitting,
  error,
  videoAvailable = false,
}: BookingFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      meetingMode: videoAvailable ? "video" : "phone",
      phone: "",
      topic: "",
      audience:
        new URLSearchParams(window.location.search).get("audience") ===
        "organization"
          ? "organization"
          : "owner",
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
      topic: `${values.audience === "owner" ? "Business owner" : "Organization partner"}: ${values.topic || "Introductory conversation"}`,
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
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "booking-name-error" : undefined}
          autoComplete="name"
          disabled={submitting}
          {...register("name")}
        />
        {errors.name && (
          <p
            id="booking-name-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="booking-email">
          Email <span aria-hidden="true">*</span>
        </Label>
        <Input
          id="booking-email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "booking-email-error" : undefined}
          type="email"
          autoComplete="email"
          disabled={submitting}
          {...register("email")}
        />
        {errors.email && (
          <p
            id="booking-email-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.email.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Your confirmation and calendar invite go here.
        </p>
      </div>

      <div className="space-y-2">
        <Label id="meeting-mode-label">How should we meet?</Label>
        <RadioGroup
          aria-labelledby="meeting-mode-label"
          disabled={submitting}
          value={meetingMode}
          onValueChange={value =>
            setValue("meetingMode", value as MeetingMode, {
              shouldValidate: true,
            })
          }
          className="grid gap-3 sm:grid-cols-2"
        >
          {MEETING_MODES.filter(
            mode => mode.value !== "video" || videoAvailable
          ).map(({ value, label, hint }) => (
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
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "booking-phone-error" : undefined}
            type="tel"
            autoComplete="tel"
            disabled={submitting}
            {...register("phone")}
          />
          {errors.phone && (
            <p
              id="booking-phone-error"
              role="alert"
              className="text-xs text-destructive"
            >
              {errors.phone.message}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="booking-audience">I’m here as a</Label>
        <select
          id="booking-audience"
          className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm"
          disabled={submitting}
          {...register("audience")}
        >
          <option value="owner">Small-business owner</option>
          <option value="organization">Organization partner</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="booking-topic">
          What would you like to talk about?{" "}
          <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="booking-topic"
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? "booking-topic-error" : undefined}
          rows={3}
          placeholder="Owners: tell us about your business and one repeated task. Partners: tell us who you serve and whether you want to host a session or sponsor a cohort."
          disabled={submitting}
          {...register("topic")}
        />
        {errors.topic && (
          <p
            id="booking-topic-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.topic.message}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <p className="text-xs leading-relaxed text-muted-foreground">
        We use these details to arrange your appointment. Please do not include
        sensitive customer or account information.{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy notice
        </Link>
        .
      </p>
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
