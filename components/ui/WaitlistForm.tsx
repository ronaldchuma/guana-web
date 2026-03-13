"use client";

import { useState } from "react";

interface WaitlistFormDictionary {
  emailLabel: string;
  placeholder: string;
  submit: string;
  submitStacked: string;
  loading: string;
  error: string;
  disclaimer: string;
  successTitle: string;
  successMessage: string;
}

interface WaitlistFormProps {
  /** "inline" = email + button side by side, "stacked" = full-width stacked */
  variant?: "inline" | "stacked";
  dictionary: WaitlistFormDictionary;
}

export default function WaitlistForm({ variant = "stacked", dictionary }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-2 max-w-[440px]">
        <p className="text-[18px] font-sans font-normal text-black">
          {dictionary.successTitle}
        </p>
        <p className="text-[16px] font-sans font-normal text-black/50 leading-[1.4]">
          {dictionary.successMessage}
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-[440px]">
        <div className="flex gap-2">
          <input
            type="email"
            required
            aria-label={dictionary.emailLabel}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dictionary.placeholder}
            className="flex-1 min-w-0 px-5 py-3 rounded-full border border-black/10 text-[16px] font-sans font-normal text-black placeholder-black/40 focus:outline-none focus:border-brand-blue transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 px-[24px] py-[10px] rounded-full bg-brand-blue hover:bg-brand-blue-hover disabled:opacity-60 text-white text-[16px] font-sans font-normal transition-colors duration-200"
          >
            {status === "loading" ? dictionary.loading : dictionary.submit}
          </button>
        </div>
        {status === "error" && (
          <p className="text-red-500 text-[14px] font-sans">{dictionary.error}</p>
        )}
        <p className="text-[14px] font-sans font-normal text-black/40">
          {dictionary.disclaimer}
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-[440px]">
      <input
        type="email"
        required
        aria-label={dictionary.emailLabel}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={dictionary.placeholder}
        className="w-full px-5 py-3.5 rounded-full border border-black/10 text-[16px] font-sans font-normal text-black placeholder-black/40 focus:outline-none focus:border-brand-blue transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-[30px] py-[10px] rounded-full bg-brand-blue hover:bg-brand-blue-hover disabled:opacity-60 text-white text-[18px] font-sans font-normal transition-colors duration-200"
      >
        {status === "loading" ? dictionary.loading : dictionary.submitStacked}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-[14px] font-sans">{dictionary.error}</p>
      )}
      <p className="text-[14px] font-sans font-normal text-black/40">
        {dictionary.disclaimer}
      </p>
    </form>
  );
}
