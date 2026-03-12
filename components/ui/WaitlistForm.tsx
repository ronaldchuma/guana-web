"use client";

import { useState } from "react";

interface WaitlistFormProps {
  /** "inline" = email + button side by side, "stacked" = full-width stacked */
  variant?: "inline" | "stacked";
}

export default function WaitlistForm({ variant = "stacked" }: WaitlistFormProps) {
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
          Pura vida — you{"'"}re in!
        </p>
        <p className="text-[16px] font-sans font-normal text-black/50 leading-[1.4]">
          We{"'"}ll send you a personal note when it{"'"}s your turn. Keep an eye on your inbox.
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 min-w-0 px-5 py-3 rounded-full border border-black/10 text-[16px] font-sans font-normal text-black placeholder-black/40 focus:outline-none focus:border-brand-blue transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 px-[24px] py-[10px] rounded-full bg-brand-blue hover:bg-brand-blue-hover disabled:opacity-60 text-white text-[16px] font-sans font-normal transition-colors duration-200"
          >
            {status === "loading" ? "Joining..." : "Join waitlist"}
          </button>
        </div>
        {status === "error" && (
          <p className="text-red-500 text-[14px] font-sans">Something went wrong. Please try again.</p>
        )}
        <p className="text-[14px] font-sans font-normal text-black/40">
          No spam. Just your launch invite when it{"'"}s time.
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-[440px]">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full px-5 py-3.5 rounded-full border border-black/10 text-[16px] font-sans font-normal text-black placeholder-black/40 focus:outline-none focus:border-brand-blue transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-[30px] py-[10px] rounded-full bg-brand-blue hover:bg-brand-blue-hover disabled:opacity-60 text-white text-[18px] font-sans font-normal transition-colors duration-200"
      >
        {status === "loading" ? "Joining..." : "Join the waitlist"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-[14px] font-sans">Something went wrong. Please try again.</p>
      )}
      <p className="text-[14px] font-sans font-normal text-black/40">
        No spam. Just your launch invite when it{"'"}s time.
      </p>
    </form>
  );
}
