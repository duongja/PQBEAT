"use client";

import { useId, useState } from "react";

type BlogNewsletterSignupProps = {
  eyebrow?: string;
  title: string;
  description: string;
  compact?: boolean;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function BlogNewsletterSignup({
  eyebrow = "Weekly blog updates",
  title,
  description,
  compact = false,
}: BlogNewsletterSignupProps) {
  const emailFieldId = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      setState("error");
      setMessage("Enter an email address to join the PQBEAT weekly list.");
      return;
    }

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/blog-updates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Could not submit your email.");
      }

      setState("success");
      setMessage(payload.message ?? "You’re on the PQBEAT weekly list.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not submit your email.");
    }
  }

  return (
    <section className={`bg-surface-container-low px-6 py-7 sm:px-8 ${compact ? "" : "sm:py-8"}`}>
      <div className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">{eyebrow}</div>
      <h2
        className={`mt-3 font-headline font-semibold tracking-[-0.05em] text-on-surface ${
          compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-on-surface-variant sm:text-base sm:leading-7">{description}</p>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex-1">
          <label
            className="mb-2 block font-label text-[10px] uppercase tracking-[0.22em] text-outline"
            htmlFor={emailFieldId}
          >
            Email address
          </label>
          <input
            id={emailFieldId}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="min-h-12 w-full border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-sm text-on-surface outline-none transition-colors placeholder:text-outline/80 focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="min-h-12 bg-primary px-5 py-3 font-label text-[11px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-primary/92 disabled:cursor-not-allowed disabled:opacity-70 sm:self-end"
        >
          {state === "submitting" ? "Joining..." : "Get updates"}
        </button>
      </form>

      {message ? (
        <p className={`mt-4 text-sm leading-6 ${state === "error" ? "text-error" : "text-on-surface-variant"}`}>{message}</p>
      ) : null}
    </section>
  );
}
