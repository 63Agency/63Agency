/**
 * ClickUp integration: create a lead task in a list when contact form is submitted.
 * Uses CLICKUP_API_TOKEN (add to .env.local) and list 901216143943, status "new lead".
 * Fetches list custom fields and maps form data into custom_fields; description is a fallback summary.
 */

const CLICKUP_LIST_ID = "901216143943";
/** Exact status name in ClickUp (case- and space-sensitive) */
const CLICKUP_STATUS = "new lead";

const BASE_URL = "https://api.clickup.com/api/v2";

/** ClickUp custom field name → our payload key or static value */
const FIELD_NAME_TO_SOURCE: Record<
  string,
  { type: "payload"; key: keyof ClickUpLeadPayload } | { type: "static"; value: string }
> = {
  "Full Name": { type: "payload", key: "name" },
  Email: { type: "payload", key: "email" },
  "Phone Number": { type: "payload", key: "phone" },
  City: { type: "payload", key: "city" },
  "Établissement": { type: "payload", key: "company" },
  Fonction: { type: "payload", key: "role" },
  "Secteur d'activité": { type: "payload", key: "sector" },
  Source: { type: "static", value: "Website 63agency.ma" },
  "Budget prêt à Investir": { type: "payload", key: "budget" },
  "Service Type": { type: "payload", key: "service" },
  "when you ready?": { type: "payload", key: "availability" },
};

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
  budget?: string;
  service?: string;
  availability?: string;
};

type ClickUpField = { id: string; name: string; type: string; type_config?: Record<string, unknown> };

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
    payload.budget ? `Budget: ${payload.budget}` : null,
    payload.service ? `Service: ${payload.service}` : null,
    payload.availability ? `Disponibilité: ${payload.availability}` : null,
    payload.message ? `Message:\n${payload.message}` : null,
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

function getAuthHeader(token: string): string {
  return token.startsWith("pk_") ? token : `Bearer ${token}`;
}

/**
 * Fetches custom fields for the list from GET list/{list_id}/field.
 * Returns array of { id, name, type }; empty array on failure.
 */
async function fetchListFields(token: string): Promise<ClickUpField[]> {
  const res = await fetch(`${BASE_URL}/list/${CLICKUP_LIST_ID}/field`, {
    headers: { Authorization: getAuthHeader(token) },
  });
  if (!res.ok) {
    console.warn("[ClickUp] fetch list fields failed:", res.status, await res.text());
    return [];
  }
  const data = await res.json();
  const rawFields = Array.isArray(data) ? data : data?.fields;
  if (!Array.isArray(rawFields)) return [];
  return rawFields.map((f: { id: string; name: string; type: string; type_config?: Record<string, unknown> }) => ({
    id: f.id,
    name: f.name,
    type: f.type,
    type_config: f.type_config,
  }));
}

/**
 * Builds custom_fields array for create task: only includes fields we have a value for.
 */
function buildCustomFields(
  fields: ClickUpField[],
  payload: ClickUpLeadPayload
): { id: string; value: string | number }[] {
  const nameToId = new Map(fields.map((f) => [f.name, f.id]));
  const out: { id: string; value: string | number }[] = [];

  for (const [fieldName, source] of Object.entries(FIELD_NAME_TO_SOURCE)) {
    const fieldId = nameToId.get(fieldName);
    if (!fieldId) continue;

    let value: string | number;
    if (source.type === "static") {
      value = source.value;
    } else {
      const raw = payload[source.key];
      if (raw === undefined || raw === "") continue;
      value = typeof raw === "string" ? raw : String(raw);
    }
    out.push({ id: fieldId, value });
  }
  return out;
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
    Authorization: getAuthHeader(token),
  };

  const fields = await fetchListFields(token);
  const custom_fields = buildCustomFields(fields, payload);

  const baseBody: { name: string; description: string; custom_fields?: { id: string; value: string | number }[] } = {
    name,
    description,
  };
  if (custom_fields.length > 0) baseBody.custom_fields = custom_fields;

  // Try with status first
  let res = await fetch(`${BASE_URL}/list/${CLICKUP_LIST_ID}/task`, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...baseBody, status: CLICKUP_STATUS }),
  });

  if (!res.ok && res.status === 400) {
    const text = await res.text();
    const isStatusError = text.includes("CRTSK_001") || text.toLowerCase().includes("status");
    if (isStatusError) {
      res = await fetch(`${BASE_URL}/list/${CLICKUP_LIST_ID}/task`, {
        method: "POST",
        headers,
        body: JSON.stringify(baseBody),
      });
    }
  }

  if (!res.ok) {
    console.error("[ClickUp] create task failed:", res.status, await res.text());
    return false;
  }

  return true;
}
