/**
 * ClickUp integration: create a lead task in a list when contact form is submitted.
 * Uses CLICKUP_API_TOKEN (add to .env.local) and list 901216143943, status "new lead".
 * Custom field IDs are hardcoded for list 901216143943; description is a fallback summary.
 */

const CLICKUP_LIST_ID = "901216143943";
/** Exact status name in ClickUp (case- and space-sensitive) */
const CLICKUP_STATUS = "new lead";

const BASE_URL = "https://api.clickup.com/api/v2";

/** Hardcoded custom field IDs for list 901216143943. Each entry: field id → payload key (or static value). */
const CUSTOM_FIELD_IDS: Array<
  { id: string } & (
    | { type: "payload"; key: keyof ClickUpLeadPayload }
    | { type: "static"; value: string }
    | { type: "dateSubmitted" }
  )
> = [
  { id: "90e56d9a-9864-4dd3-b6ff-8eadd681995b", type: "payload", key: "name" }, // Full Name
  { id: "cf170d1a-077f-4912-ae5a-9d1609af4cf3", type: "payload", key: "email" }, // Email
  { id: "9f4f7b73-9475-46fe-85a0-b990096cb1d9", type: "payload", key: "phone" }, // Phone Number (manuel)
  { id: "2564654e-3169-4816-b521-4cf8a9791b84", type: "payload", key: "city" }, // City
  { id: "6ba586e1-62aa-40b7-baf5-307c9cf9b7a0", type: "payload", key: "availability" }, // when you ready?
  { id: "af3f1e6b-7eee-4fae-9cc8-fd8a648140ca", type: "payload", key: "role" }, // Fonction
  { id: "b0d0af66-e11d-4204-b726-e548b525d4e2", type: "dateSubmitted" }, // Date Submitted
  { id: "c74b47d5-6b1a-4c7d-b237-39b7b6542b6d", type: "payload", key: "budget" }, // Budget prêt à Investir
  { id: "ce16924f-be03-463f-a368-93d6051004b8", type: "static", value: "Website 63agency.ma" }, // Source
  { id: "e8cb1a0d-fdda-4fee-88a5-8aecd3e48ed7", type: "payload", key: "service" }, // Service Type
  { id: "ed40c77d-29fc-4681-8eb6-5578ceb9a761", type: "payload", key: "company" }, // Établissement
  { id: "f4dc469d-dbda-4ceb-b477-c596d13369a7", type: "payload", key: "objective" }, // Objectif
  { id: "f8705cd4-72d4-4db8-8be4-f7d024a22853", type: "payload", key: "sector" }, // Secteur d'activité
];

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

/** Placeholder when form did not send a value, so every mapped field gets filled in ClickUp */
const EMPTY_PLACEHOLDER = "—";

/**
 * Builds custom_fields array from hardcoded IDs and payload.
 * All mapped fields get a value (form data, static, date, or placeholder).
 */
function buildCustomFields(payload: ClickUpLeadPayload): { id: string; value: string | number }[] {
  const out: { id: string; value: string | number }[] = [];
  for (const field of CUSTOM_FIELD_IDS) {
    let value: string | number;
    if (field.type === "payload") {
      const raw = payload[field.key];
      value =
        raw !== undefined && raw !== "" ? (typeof raw === "string" ? raw : String(raw)) : EMPTY_PLACEHOLDER;
    } else if (field.type === "static") {
      value = field.value;
    } else {
      value = Date.now();
    }
    out.push({ id: field.id, value });
  }
  return out;
}

/**
 * After task creation, set each custom field via Set Custom Field Value so they are applied
 * (create task sometimes does not apply dropdown/date custom fields).
 */
async function setCustomFieldsAfterCreate(
  taskId: string,
  customFields: { id: string; value: string | number }[],
  headers: Record<string, string>
): Promise<void> {
  for (const { id: fieldId, value } of customFields) {
    try {
      const res = await fetch(`${BASE_URL}/task/${taskId}/field/${fieldId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ value }),
      });
      if (!res.ok) {
        console.warn("[ClickUp] set field failed:", fieldId, res.status, await res.text());
      }
    } catch (e) {
      console.warn("[ClickUp] set field error:", fieldId, e);
    }
  }
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

  const custom_fields = buildCustomFields(payload);

  const baseBody: { name: string; description: string; custom_fields?: { id: string; value: string | number }[] } = {
    name,
    description,
  };
  if (custom_fields.length > 0) baseBody.custom_fields = custom_fields;

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

  const task = await res.json().catch(() => null);
  const taskId = task?.id ?? task?.data?.id;
  if (taskId && custom_fields.length > 0) {
    await setCustomFieldsAfterCreate(taskId, custom_fields, headers);
  }

  return true;
}
