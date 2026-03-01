import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const TEMPLATE_ID_ADMIN = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN ?? "";
const TEMPLATE_ID_CLIENT = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT ?? "";
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL ?? "contact@63agency.com";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  company: string;
  role: string;
  objective: string;
  timing: string;
  campaigns: string;
  sector: string;
  establishment: string;
};

export function isEmailJSConfigured(): boolean {
  return Boolean(SERVICE_ID && PUBLIC_KEY && TEMPLATE_ID_ADMIN && TEMPLATE_ID_CLIENT);
}

/**
 * Send 1) email to admin (new lead), 2) email to client (confirmation).
 * Uses sequential sends to respect EmailJS rate limit (~1 req/s).
 */
export async function sendContactEmails(data: ContactFormData): Promise<void> {
  if (!isEmailJSConfigured()) {
    throw new Error("EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_* env variables.");
  }

  const adminParams = {
    to_email: ADMIN_EMAIL,
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    city: data.city,
    address: data.address,
    company: data.company,
    role: data.role,
    objective: data.objective,
    timing: data.timing,
    campaigns: data.campaigns,
    sector: data.sector,
    establishment: data.establishment,
    subject_admin: `[63 Agency] Nouveau contact - ${data.name}`,
  };

  const clientParams = {
    to_email: data.email,
    client_name: data.name,
    subject_client: "63 Agency — Nous avons bien reçu votre message",
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, adminParams, PUBLIC_KEY);

  await new Promise((r) => setTimeout(r, 1100));
  await emailjs.send(SERVICE_ID, TEMPLATE_ID_CLIENT, clientParams, PUBLIC_KEY);
}
