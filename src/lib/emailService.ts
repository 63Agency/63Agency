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
 * Email 1: Confirmation sent TO THE CLIENT at their submitted email address.
 */
function getClientConfirmationHtml(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5; padding: 40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background-color:#0f0f14; padding: 32px 40px; text-align:center;">
          <p style="margin:0; font-size:24px; font-weight:700; color:#ffffff;">63 AGENCY</p>
        </td></tr>
        <tr><td style="padding: 40px;">
          <p style="margin:0 0 20px 0; font-size:18px; color:#111827; font-weight:600;">Bonjour ${escapeHtml(name)},</p>
          <p style="margin:0 0 16px 0; font-size:16px; color:#374151; line-height:1.6;">Nous avons bien reçu votre message et nous vous remercions pour votre intérêt.</p>
          <p style="margin:0 0 24px 0; font-size:16px; color:#374151; line-height:1.6;">Un membre de notre équipe vous recontactera très prochainement.</p>
          <p style="margin: 28px 0 0 0; font-size:16px; color:#111827;">Cordialement,</p>
          <p style="margin: 4px 0 0 0; font-size:16px; color:#22c55e; font-weight:600;">L'équipe 63 Agency</p>
        </td></tr>
        <tr><td style="padding: 24px 40px; background-color:#f8fafc; font-size:12px; color:#6b7280; text-align:center;">63 Agency · Génération de leads qualifiés</td></tr>
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
          <p style="margin:0; font-size:22px; font-weight:700; color:#ffffff;">63 AGENCY</p>
          <p style="margin:8px 0 0 0; font-size:13px; color:rgba(255,255,255,0.7);">Nouveau contact</p>
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
