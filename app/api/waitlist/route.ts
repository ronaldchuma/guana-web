import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  full_name: z.string().max(100).default(""),
  email: z.string().email().max(255),
  phone: z.string().max(20).nullish().transform((v) => v || null),
  role: z.enum(["driver", "passenger", "both"]).default("both"),
  routes: z.array(z.string().max(100)).max(20).default([]),
  source: z.string().max(100).nullish().transform((v) => v || null),
});

const limiter = rateLimit({ interval: 60_000, limit: 5 });

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const { success } = limiter.check(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("waitlist").insert(result.data);

    if (error) {
      // Unique constraint on email — treat as success so we don't leak
      // whether an address is already on the list.
      if (error.code === "23505") {
        return NextResponse.json({ success: true });
      }
      console.error("[waitlist]", error);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
