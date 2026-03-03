import { getSupabaseAdmin } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { z } from "zod";

const waitlistSchema = z.object({
  full_name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).nullish().transform((v) => v || null),
  role: z.enum(["rider", "driver"]),
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

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit" },
      { status: 500 }
    );
  }
}
