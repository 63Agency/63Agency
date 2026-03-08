import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.titan.email";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? process.env.SMTP_USER ?? "";
const FROM_NAME = process.env.FROM_NAME ?? "63 Agency";

/** Keys from page contact form + CTA (accueil) form — all can appear in admin email */
export type ContactFormPayload = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  city?: string;
  company?: string;
  employees?: string;
  role?: string;
  objective?: string;
  timing?: string;
  campaigns?: string;
  sector?: string;
  establishment?: string;
};

function getTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

/**
 * Email 1: Confirmation sent TO THE CLIENT.
 * Section logo = fond noir. Section texte = fond blanc, texte noir. Responsive mobile.
 */
function getClientConfirmationHtml(name: string): string {
  const safeName = escapeHtml(name);
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <style type="text/css">
    :root { color-scheme: light; supported-color-schemes: light; }
    .card { background: #ffffff !important; }
    .logo-cell { background: #000000 !important; }
    .body-cell { background: #ffffff !important; }
    .body-cell, .body-cell h1, .body-cell p, .body-cell a { color: #000000 !important; }
    @media only screen and (max-width: 600px) {
      .wrapper { padding: 16px 12px !important; }
      .card { max-width: 100% !important; border-radius: 12px !important; }
      .logo-cell { padding: 24px 20px !important; text-align: center !important; }
      .body-cell { padding: 24px 20px 32px !important; }
      .footer-cell { padding: 16px 20px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#111; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="wrapper" style="background-color:#111; padding: 40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="card" style="max-width: 520px; background: #ffffff; border-radius: 12px; overflow: hidden;">
        <tr><td class="logo-cell" style="background: #000000; padding: 28px 32px; text-align: center;">
          <img src="https://lhleyqtvyojrqwjthlfz.supabase.co/storage/v1/object/public/assets/63.png" alt="63 Agency" width="100" style="display: block; max-width: 100px; height: auto; margin: 0 auto;" />
        </td></tr>
        <tr><td class="body-cell" style="padding: 32px 28px 28px; background: #ffffff;">
          <h1 style="margin: 0 0 20px; font-size: 20px; font-weight: 700; color: #000000; line-height: 1.25;">Merci pour votre message</h1>
          <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #000000;">Bonjour ${safeName},</p>
          <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.65; color: #1a1a1a;">Nous avons bien re&#231;u votre demande. Notre &#233;quipe vous recontactera sous 24 &#224; 48&#8239;h ouvr&#233;es.</p>
          <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.5; color: #1a1a1a;">En attendant&#8239;: <a href="tel:+212720007007" style="color: #000000; font-weight: 600; text-decoration: none;">07 20 007 007</a> &#183; <a href="mailto:contact@63agency.com" style="color: #000000; font-weight: 600; text-decoration: none;">contact@63agency.com</a></p>
          <p style="margin: 0; font-size: 14px; color: #1a1a1a;">&#192; bient&#244;t,<br><strong style="color: #000000;">63 Agency</strong></p>
        </td></tr>
        <tr><td class="footer-cell" style="padding: 16px 28px; background: #f5f5f5; border-top: 1px solid #eee;">
          <p style="margin: 0; font-size: 11px; color: #666;">63 Agency &#183; Lead generation &amp; performance</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

/** Admin email: label + value row (only if value is non-empty). Email value becomes mailto link. */
function adminRow(label: string, value: string | undefined): string {
  if (value === undefined || value.trim() === "") return "";
  const safe = escapeHtml(value.trim());
  const content =
    label === "Email"
      ? `<a href="mailto:${safe}" style="color:#22c55e; text-decoration:none;">${safe}</a>`
      : safe;
  return `
    <tr><td style="padding: 10px 0; border-bottom:1px solid #e5e7eb;">
      <p style="margin:0; font-size:11px; color:#6b7280; text-transform:uppercase;">${escapeHtml(label)}</p>
      <p style="margin:4px 0 0 0; font-size:16px; color:#111827;">${content}</p>
    </td></tr>`;
}

/**
 * Email 2: Notification sent TO THE ADMIN with all form keys (contact page + CTA accueil).
 */
function getAdminNotificationHtml(data: ContactFormPayload): string {
  const rows = [
    adminRow("Nom", data.name),
    adminRow("Email", data.email),
    adminRow("Téléphone", data.phone),
    adminRow("Ville", data.city),
    adminRow("Entreprise", data.company),
    adminRow("Effectif", data.employees),
    adminRow("Rôle", data.role),
    adminRow("Objectif", data.objective),
    adminRow("Délai", data.timing),
    adminRow("Campagnes en cours", data.campaigns),
    adminRow("Secteur", data.sector),
    adminRow("Établissement", data.establishment),
    adminRow("Message", data.message),
  ].filter(Boolean);

  const bodyRows = rows.length > 0 ? rows.join("") : adminRow("Message", "(Aucun détail)");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5; padding: 32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background-color:#0f0f14; padding: 24px 32px; text-align:center;">
          <img src="https://lhleyqtvyojrqwjthlfz.supabase.co/storage/v1/object/public/assets/63.png" alt="63 Agency" width="120" style="display:block; max-width:120px; height:auto; margin:0 auto;" />
          <p style="margin:16px 0 0 0; font-size:13px; color:rgba(255,255,255,0.7);">Nouveau contact</p>
        </td></tr>
        <tr><td style="padding: 32px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${bodyRows}</table>
        </td></tr>
        <tr><td style="padding: 16px 32px; background-color:#f8fafc; font-size:12px; color:#6b7280; text-align:center;">Formulaire contact 63 Agency</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends two emails simultaneously when a user submits the contact form:
 * 1. Confirmation email TO THE CLIENT (at their submitted email).
 * 2. Notification email TO THE ADMIN with all client details.
 */
export async function sendContactEmails(data: ContactFormPayload): Promise<void> {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP credentials not configured. Set SMTP_USER and SMTP_PASS in .env");
  }

  const transporter = getTransporter();
  const adminEmail = ADMIN_EMAIL || SMTP_USER;

  const [clientResult, adminResult] = await Promise.all([
    transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: data.email,
      subject: "63 Agency — Nous avons bien reçu votre message",
      html: getClientConfirmationHtml(data.name),
    }),
    transporter.sendMail({
      from: `"${FROM_NAME}" <${SMTP_USER}>`,
      to: adminEmail,
      subject: `[63 Agency] Nouveau contact — ${data.name}`,
      html: getAdminNotificationHtml(data),
    }),
  ]);

  if (clientResult.rejected?.length || adminResult.rejected?.length) {
    throw new Error("One or more emails failed to send");
  }
}
