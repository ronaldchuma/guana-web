-- ============================================================================
-- Migration: Waitlist notifications, admin views, and approval workflow
-- Date: 2026-03-12
-- Moves waitlist infrastructure from the app DB to the website DB where it belongs
--
-- Adds:
-- 1. status + updated_at columns for approval workflow
-- 2. pg_net extension for HTTP calls (Resend emails)
-- 3. Email template functions (welcome + approval)
-- 4. Notification triggers (on insert + on status change)
-- 5. Admin stats views (waitlist_stats, waitlist_signups_by_day)
-- ============================================================================

-- ============================================================================
-- 1. ADD MISSING COLUMNS FOR APPROVAL WORKFLOW
-- ============================================================================

ALTER TABLE public.waitlist
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- ============================================================================
-- 2. ENABLE pg_net FOR HTTP CALLS (Resend emails)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- ============================================================================
-- 3. TRIGGER: auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_waitlist_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS set_waitlist_updated_at ON public.waitlist;
CREATE TRIGGER set_waitlist_updated_at
  BEFORE UPDATE ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION public.update_waitlist_updated_at();

-- ============================================================================
-- 4. EMAIL TEMPLATE FUNCTIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION public.waitlist_welcome_email_html(p_name text)
RETURNS text
LANGUAGE plpgsql
SET search_path = ''
AS $function$
DECLARE
  v_display_name text;
BEGIN
  v_display_name := COALESCE(NULLIF(TRIM(p_name), ''), 'there');

  RETURN '<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bienvenido a Guana</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f6ed;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f6ed;padding:48px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:10px;overflow:hidden;">

<tr>
<td style="padding:40px 28px 0;text-align:center;">
<img src="https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media/guana-logo.png" alt="Guana" width="27" style="display:inline-block;height:auto;" />
</td>
</tr>

<tr>
<td style="padding:28px 28px 40px;">

<h1 style="margin:0 0 24px;color:#002600;font-size:28px;font-weight:500;line-height:1.1;">
Pura vida!
</h1>

<p style="margin:0 0 20px;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
Soy Ronald, fundador de Guana. Te escribo personalmente para decirte que ya estás en nuestra lista de espera.
</p>

<p style="margin:0 0 20px;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
Estamos construyendo la forma más social y accesible de viajar por Costa Rica — conectando surfers, nómadas digitales, ticos y turistas que van en la misma dirección para compartir ride, dividir costos y hacer el viaje parte de la aventura.
</p>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
<tr>
<td style="background-color:#f2f6ed;border-radius:10px;padding:24px;">
<p style="margin:0 0 4px;color:#002600;font-size:16px;font-weight:500;">¿Qué sigue?</p>
<p style="margin:0;color:#002600;font-size:15px;line-height:1.5;font-weight:400;opacity:0.7;">
Te voy a avisar personalmente cuando sea tu turno. Los primeros en la lista tendrán acceso anticipado y beneficios exclusivos.
</p>
</td>
</tr>
</table>

<p style="margin:0 0 4px;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
Nos vemos en el camino,
</p>

<img src="https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media/Ronald%20Signature.png" alt="Ronald" width="120" style="display:block;margin:8px 0 4px;height:auto;" />

<p style="margin:0;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
<strong>Ronald</strong><br>
<span style="opacity:0.5;font-size:14px;">Fundador, Guana</span>
</p>

</td>
</tr>

<tr>
<td style="padding:0 28px 32px;text-align:center;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="border-top:1px solid rgba(0,0,0,0.06);padding-top:24px;">
<p style="margin:0 0 8px;color:#002600;font-size:14px;line-height:1.4;font-weight:400;opacity:0.4;">
Ventanas abajo, música arriba,<br>desconocidos que se hacen amigos.
</p>
<p style="margin:0;">
<a href="https://guana.app" style="color:#002600;font-size:14px;text-decoration:none;font-weight:400;opacity:0.4;">guana.app</a>
</p>
</td></tr>
</table>
</td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>';
END;
$function$;

CREATE OR REPLACE FUNCTION public.waitlist_approved_email_html(p_name text)
RETURNS text
LANGUAGE plpgsql
SET search_path = ''
AS $function$
DECLARE
  v_display_name text;
BEGIN
  v_display_name := COALESCE(NULLIF(TRIM(p_name), ''), 'there');

  RETURN '<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Estás dentro</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f6ed;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f6ed;padding:48px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:10px;overflow:hidden;">

<tr>
<td style="padding:40px 28px 0;text-align:center;">
<img src="https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media/guana-logo.png" alt="Guana" width="27" style="display:inline-block;height:auto;" />
</td>
</tr>

<tr>
<td style="padding:28px 28px 40px;">

<h1 style="margin:0 0 24px;color:#002600;font-size:28px;font-weight:500;line-height:1.1;">
Estás dentro!
</h1>

<p style="margin:0 0 20px;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
Soy Ronald de Guana. Quería darte la noticia personalmente: tu espera terminó. Ya tienes acceso a Guana.
</p>

<p style="margin:0 0 28px;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
Descarga la app y empieza a compartir rides hoy mismo.
</p>

<table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
<tr>
<td align="center" style="background-color:#002600;border-radius:999px;">
<a href="https://apps.apple.com/app/guana/id6504720981" style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:16px;font-weight:400;text-decoration:none;letter-spacing:0.2px;">
Descargar Guana para iOS
</a>
</td>
</tr>
</table>

<table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
<tr>
<td style="background-color:#f2f6ed;border-radius:10px;padding:24px;">
<p style="margin:0 0 16px;color:#002600;font-size:16px;font-weight:500;">Empieza en 3 pasos</p>

<table cellpadding="0" cellspacing="0" width="100%">
<tr>
<td style="padding:0 0 14px;vertical-align:top;">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="width:28px;vertical-align:top;">
<div style="background:linear-gradient(109.5deg,#ffc942 0%,#ffb600 100%);width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-size:13px;font-weight:500;color:#002600;">1</div>
</td>
<td style="padding-left:12px;color:#002600;font-size:15px;line-height:1.4;font-weight:400;">Descarga la app y crea tu perfil</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:0 0 14px;vertical-align:top;">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="width:28px;vertical-align:top;">
<div style="background:linear-gradient(109.5deg,#ffc942 0%,#ffb600 100%);width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-size:13px;font-weight:500;color:#002600;">2</div>
</td>
<td style="padding-left:12px;color:#002600;font-size:15px;line-height:1.4;font-weight:400;">Busca un ride o publica el tuyo</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="vertical-align:top;">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="width:28px;vertical-align:top;">
<div style="background:linear-gradient(109.5deg,#ffc942 0%,#ffb600 100%);width:24px;height:24px;border-radius:50%;text-align:center;line-height:24px;font-size:13px;font-weight:500;color:#002600;">3</div>
</td>
<td style="padding-left:12px;color:#002600;font-size:15px;line-height:1.4;font-weight:400;">Viaja, conoce gente y ahorra</td>
</tr>
</table>
</td>
</tr>
</table>

</td>
</tr>
</table>

<p style="margin:0 0 20px;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
¿Ya estás conduciendo hacia algún lado? Publica tu viaje y llena esos asientos vacíos. Cada ride compartido hace las carreteras de Costa Rica un poco más divertidas.
</p>

<p style="margin:0 0 4px;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
Pura vida,
</p>

<img src="https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media/Ronald%20Signature.png" alt="Ronald" width="120" style="display:block;margin:8px 0 4px;height:auto;" />

<p style="margin:0;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
<strong>Ronald</strong><br>
<span style="opacity:0.5;font-size:14px;">Fundador, Guana</span>
</p>

</td>
</tr>

<tr>
<td style="padding:0 28px 32px;text-align:center;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="border-top:1px solid rgba(0,0,0,0.06);padding-top:24px;">
<p style="margin:0 0 8px;color:#002600;font-size:14px;line-height:1.4;font-weight:400;opacity:0.4;">
Ventanas abajo, música arriba,<br>desconocidos que se hacen amigos.
</p>
<p style="margin:0;">
<a href="https://guana.app" style="color:#002600;font-size:14px;text-decoration:none;font-weight:400;opacity:0.4;">guana.app</a>
</p>
</td></tr>
</table>
</td>
</tr>

</table>
</td></tr>
</table>
</body>
</html>';
END;
$function$;

-- ============================================================================
-- 5. NOTIFICATION TRIGGERS (use full_name column)
-- ============================================================================

-- NOTE: The on-insert welcome email + Resend contact creation is handled by
-- the Next.js API route (lib/resend.ts) rather than a DB trigger. This avoids
-- Resend's 2 req/sec rate limit when pg_net fires multiple calls simultaneously.

-- 5a. On UPDATE: send approval email when status changes to 'approved'
CREATE OR REPLACE FUNCTION public.notify_waitlist_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  v_resend_key text;
  v_email_html text;
  v_subject text;
  v_text_body text;
BEGIN
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;

  SELECT decrypted_secret INTO v_resend_key
    FROM vault.decrypted_secrets WHERE name = 'resend_api_key' LIMIT 1;

  IF v_resend_key IS NULL THEN
    RAISE WARNING 'resend_api_key not found in vault';
    RETURN NEW;
  END IF;

  IF NEW.status = 'approved' THEN
    v_email_html := public.waitlist_approved_email_html(NEW.full_name);
    v_subject := '¡Estás dentro! Descarga Guana ahora 🎉';
    v_text_body := 'Hola ' || coalesce(nullif(trim(NEW.full_name), ''), 'Viajero') || '! Soy Ronald de Guana. Tu espera terminó — ya tienes acceso. Descarga la app: https://apps.apple.com/app/guana/id6504720981 — Pura vida, Ronald';
  ELSE
    RETURN NEW;
  END IF;

  PERFORM net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_resend_key
    ),
    body := jsonb_build_object(
      'from', 'Ronald from Guana <hello@guana.app>',
      'to', ARRAY[NEW.email],
      'subject', v_subject,
      'html', v_email_html,
      'text', v_text_body
    )
  );

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS on_waitlist_status_change ON public.waitlist;
CREATE TRIGGER on_waitlist_status_change
  AFTER UPDATE ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_waitlist_status_change();

-- ============================================================================
-- 6. ADMIN STATS VIEWS
-- ============================================================================

CREATE OR REPLACE VIEW public.waitlist_stats
WITH (security_invoker = true)
AS
SELECT
    (SELECT count(*) FROM public.waitlist) AS total_signups,
    (SELECT count(*) FROM public.waitlist WHERE status = 'pending') AS pending_count,
    (SELECT count(*) FROM public.waitlist WHERE status = 'approved') AS approved_count,
    (SELECT count(*) FROM public.waitlist WHERE status = 'rejected') AS rejected_count;

CREATE OR REPLACE VIEW public.waitlist_signups_by_day
WITH (security_invoker = true)
AS
SELECT
    (date_trunc('day', created_at))::date AS signup_date,
    count(*) AS signups,
    count(*) FILTER (WHERE status = 'pending') AS pending,
    count(*) FILTER (WHERE status = 'approved') AS approved,
    count(*) FILTER (WHERE status = 'rejected') AS rejected
FROM public.waitlist
GROUP BY (date_trunc('day', created_at))::date
ORDER BY (date_trunc('day', created_at))::date DESC;
