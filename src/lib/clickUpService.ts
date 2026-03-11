/**
 * ClickUp integration: create a lead task in a list when contact form is submitted.
 * Uses CLICKUP_API_TOKEN and list 901216143943, status "NEW LEAD".
 */

const CLICKUP_LIST_ID = "901216143943";
/** Exact status name in ClickUp (case- and space-sensitive) */
const CLICKUP_STATUS = "new lead";

export type ClickUpLeadPayload = {
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

function getDescription(payload: ClickUpLeadPayload): string {
  const lines: string[] = [
    `Email: ${payload.email}`,
    `Téléphone: ${payload.phone || "—"}`,
    payload.company ? `Entreprise: ${payload.company}` : null,
    payload.role ? `Rôle: ${payload.role}` : null,
    payload.city ? `Ville: ${payload.city}` : null,
    payload.sector ? `Secteur: ${payload.sector}` : null,
    payload.establishment ? `Établissement: ${payload.establishment}` : null,
    payload.employees ? `Effectifs: ${payload.employees}` : null,
    payload.objective ? `Objectif: ${payload.objective}` : null,
    payload.timing ? `Délai: ${payload.timing}` : null,
    payload.campaigns ? `Campagnes: ${payload.campaigns}` : null,
    payload.message ? `Message:\n${payload.message}` : null,
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

/**
 * Creates a lead task in ClickUp. Does not throw; logs errors.
 * Returns true if the task was created, false otherwise.
 */
export async function createClickUpLead(payload: ClickUpLeadPayload): Promise<boolean> {
  const token = process.env.CLICKUP_API_TOKEN;
  if (!token?.trim()) {
    console.warn("[ClickUp] CLICKUP_API_TOKEN is not set; skipping lead creation.");
    return false;
  }

  const name = `Lead: ${payload.name}`;
  const description = getDescription(payload);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: token.startsWith("pk_") ? token : `Bearer ${token}`,
  };

  const baseBody = { name, description };

  // Try with status "NEW LEAD" first (exact string: case and spacing)
  let res = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...baseBody, status: CLICKUP_STATUS }),
  });

  if (!res.ok && res.status === 400) {
    const text = await res.text();
    const isStatusError = text.includes("CRTSK_001") || text.toLowerCase().includes("status");
    if (isStatusError) {
      // Fallback: create task without status (uses list default)
      res = await fetch(`https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`, {
        method: "POST",
        headers,
        body: JSON.stringify(baseBody),
      });
    }
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("[ClickUp] create task failed:", res.status, text);
    return false;
  }

  return true;
}
