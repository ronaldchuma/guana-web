-- Security Fix: Enable Row Level Security on all public tables
--
-- ISSUE: Both `contact_messages` and `waitlist` tables had RLS disabled,
-- allowing anyone with the public anon key to read, insert, update, and
-- delete all data — including personal information (emails, phone numbers).
--
-- FIX: Enable RLS and restrict access. All server-side operations use the
-- service role key which bypasses RLS, so no application changes are needed.

-- ============================================================
-- 1. Enable RLS on both tables
-- ============================================================
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. Revoke direct table permissions from anon and authenticated
--    (defense in depth — RLS alone blocks access, but revoking
--     unnecessary grants is best practice)
-- ============================================================
REVOKE ALL ON public.contact_messages FROM anon;
REVOKE ALL ON public.waitlist FROM anon;
REVOKE ALL ON public.contact_messages FROM authenticated;
REVOKE ALL ON public.waitlist FROM authenticated;

-- ============================================================
-- 3. Force RLS for table owners too (prevents bypassing RLS
--    if a function runs as the table owner via SECURITY DEFINER)
-- ============================================================
ALTER TABLE public.contact_messages FORCE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist FORCE ROW LEVEL SECURITY;
