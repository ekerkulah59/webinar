import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { submitLead, type LeadSource } from "@/lib/leads";

const webinarSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[\d\s().-]{7,20}$/, "Enter a valid phone number"),
  website: z.string().optional(),
});

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
  name: z.string().optional(),
  website: z.string().optional(),
});

type WebinarValues = z.infer<typeof webinarSchema>;
type NewsletterValues = z.infer<typeof newsletterSchema>;

type LeadFormProps = {
  source: LeadSource;
  webinarSlug?: string;
  submitLabel?: string;
  className?: string;
  /** Light text on dark sections (newsletter footer) */
  variant?: "default" | "inverted";
  onSuccess?: () => void;
};

export function LeadForm({
  source,
  webinarSlug,
  submitLabel,
  className,
  variant = "default",
  onSuccess,
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const isWebinar = source === "webinar";
  const inverted = variant === "inverted";

  const form = useForm<WebinarValues | NewsletterValues>({
    resolver: zodResolver(isWebinar ? webinarSchema : newsletterSchema),
    defaultValues: isWebinar
      ? { name: "", email: "", phone: "", website: "" }
      : { email: "", name: "", website: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const onSubmit = async (values: WebinarValues | NewsletterValues) => {
    if (values.website) return;

    try {
      await submitLead({
        source,
        email: values.email,
        name: "name" in values ? values.name : undefined,
        phone: "phone" in values ? values.phone : undefined,
        webinarSlug: isWebinar ? webinarSlug : undefined,
      });
      setSubmitted(true);
      reset();
      onSuccess?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      form.setError("root", { message });
    }
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-xl border px-4 py-5 text-sm leading-relaxed",
          inverted
            ? "border-background/20 bg-background/10 text-background"
            : "border-accent/30 bg-accent/5 text-foreground",
          className
        )}
      >
        <p className="font-semibold">
          {isWebinar ? "You're registered!" : "You're on the list!"}
        </p>
        <p className={cn("mt-1", inverted ? "text-background/80" : "text-muted-foreground")}>
          {isWebinar
            ? "Check your email for the webinar link and calendar details. We'll also text you a confirmation and a reminder before the session."
            : "We'll send updates on webinars, courses, and AI insights — no spam."}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className={cn(
            "mt-3 text-xs font-medium underline underline-offset-2",
            inverted ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Submit another
        </button>
      </div>
    );
  }

  const labelClass = inverted ? "text-background/90" : undefined;
  const inputClass = inverted
    ? "bg-background/10 border-background/25 text-background placeholder:text-background/45"
    : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)} noValidate>
      {/* Honeypot — hidden from users, bots often fill it */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      {isWebinar && (
        <div className="space-y-2">
          <Label htmlFor={`${source}-name`} className={labelClass}>
            Full name
          </Label>
          <Input
            id={`${source}-name`}
            autoComplete="name"
            disabled={isSubmitting}
            className={inputClass}
            {...register("name")}
          />
          {"name" in errors && errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
      )}

      {!isWebinar && (
        <div className="space-y-2">
          <Label htmlFor={`${source}-name-opt`} className={labelClass}>
            Name <span className={inverted ? "text-background/50" : "text-muted-foreground"}>(optional)</span>
          </Label>
          <Input
            id={`${source}-name-opt`}
            autoComplete="name"
            disabled={isSubmitting}
            className={inputClass}
            {...register("name")}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={`${source}-email`} className={labelClass}>
          Email
        </Label>
        <Input
          id={`${source}-email`}
          type="email"
          autoComplete="email"
          disabled={isSubmitting}
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className={cn("text-xs", inverted ? "text-red-200" : "text-destructive")}>
            {errors.email.message}
          </p>
        )}
      </div>

      {isWebinar && (
        <div className="space-y-2">
          <Label htmlFor={`${source}-phone`} className={labelClass}>
            Phone
          </Label>
          <Input
            id={`${source}-phone`}
            type="tel"
            autoComplete="tel"
            disabled={isSubmitting}
            className={inputClass}
            {...register("phone")}
          />
          {"phone" in errors && errors.phone && (
            <p className={cn("text-xs", inverted ? "text-red-200" : "text-destructive")}>
              {errors.phone.message}
            </p>
          )}
          <p className={cn("text-xs", inverted ? "text-background/60" : "text-muted-foreground")}>
            We&apos;ll text you a confirmation and a reminder before the session.
          </p>
        </div>
      )}

      {errors.root && (
        <p className={cn("text-xs", inverted ? "text-red-200" : "text-destructive")}>
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className={cn(
          "w-full sm:w-auto font-semibold",
          inverted && "bg-background text-foreground hover:bg-background/90"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting…
          </>
        ) : (
          submitLabel ?? (isWebinar ? "Register Now" : "Subscribe")
        )}
      </Button>
    </form>
  );
}
