"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

interface ContactFormLabels {
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  success: string;
  error: string;
}

interface ContactFormProps {
  labels: ContactFormLabels;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ labels }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center"
        role="status"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto h-12 w-12 text-teal"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p className="mt-4 text-lg font-medium text-teal-700">
          {labels.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-deep/80 mb-2"
        >
          {labels.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-deep/10 bg-white px-4 py-3 text-base text-deep placeholder:text-deep/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-deep/80 mb-2"
        >
          {labels.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-deep/10 bg-white px-4 py-3 text-base text-deep placeholder:text-deep/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors"
        />
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-deep/80 mb-2"
        >
          {labels.subject}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          className="w-full rounded-xl border border-deep/10 bg-white px-4 py-3 text-base text-deep placeholder:text-deep/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-deep/80 mb-2"
        >
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-deep/10 bg-white px-4 py-3 text-base text-deep placeholder:text-deep/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 transition-colors resize-y"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-sm text-coral" role="alert">
          {labels.error}
        </p>
      )}

      {/* Submit */}
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {labels.submit}
          </span>
        ) : (
          labels.submit
        )}
      </Button>
    </form>
  );
}
