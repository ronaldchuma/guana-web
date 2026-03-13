import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY env var");
  _resend = new Resend(key);
  return _resend;
}

function getSegmentId(): string {
  const id = process.env.RESEND_WAITLIST_SEGMENT_ID;
  if (!id) throw new Error("Missing RESEND_WAITLIST_SEGMENT_ID env var");
  return id;
}

function parseName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] || undefined,
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : undefined,
  };
}

const WELCOME_HTML = `<!DOCTYPE html>
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

<!-- Logo header -->
<tr>
<td style="padding:40px 28px 0;text-align:center;">
<img src="https://guana.app/images/guana-logo.svg" alt="Guana" width="27" style="display:inline-block;vertical-align:middle;height:auto;" />
</td>
</tr>

<!-- Body -->
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

<!-- Signature image -->
<img src="https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media/Ronald%20Signature.png" alt="Ronald" width="120" style="display:block;margin:8px 0 4px;height:auto;" />

<p style="margin:0;color:#002600;font-size:16px;line-height:1.5;font-weight:400;">
<strong>Ronald</strong><br>
<span style="opacity:0.5;font-size:14px;">Fundador, Guana</span>
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:0 48px 40px;text-align:center;">
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
</html>`;

/**
 * Adds a contact to the waitlist segment and sends the welcome email.
 * Calls are sequential to stay within Resend's 2 req/sec rate limit.
 */
export async function onWaitlistSignup(email: string, fullName: string) {
  const resend = getResend();
  const segmentId = getSegmentId();
  const { firstName, lastName } = parseName(fullName);

  // 1. Add contact to waitlist segment (creates contact if new)
  await resend.contacts.create({
    audienceId: segmentId,
    email,
    firstName,
    lastName,
  });

  // 2. Send welcome email
  const displayName = fullName.trim() || "Viajero";
  await resend.emails.send({
    from: "Ronald from Guana <hello@guana.app>",
    to: [email],
    subject: "¡Estás en la lista! Bienvenido a Guana 🌴",
    html: WELCOME_HTML,
    text: `Hola ${displayName}! Soy Ronald, fundador de Guana. Ya estás en nuestra lista de espera. Te voy a avisar personalmente cuando sea tu turno. — Ronald, Guana`,
  });
}
