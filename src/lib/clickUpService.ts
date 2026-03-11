/**
 * ClickUp integration: create a lead task in a list when contact form is submitted.
 * Uses CLICKUP_API_TOKEN (add to .env.local) and list 901216143943, status "new lead".
 * Custom field IDs are hardcoded for list 901216143943; description is a fallback summary.
 */

const CLICKUP_LIST_ID = "901216143943";
/** Exact status name in ClickUp (case- and space-sensitive) */
const CLICKUP_STATUS = "new lead";

const BASE_URL = "https://api.clickup.com/api/v2";

/**
 * Champs ClickUp ← formulaire contact (liste 901216143943).
 * - 404 "Field not found" = ID du champ incorrect : récupérer le bon ID dans ClickUp (liste → paramètres champs).
 * - Source = liste déroulante : définir CLICKUP_SOURCE_OPTION_INDEX (0, 1, 2…) dans .env.
 * - Champs retirés car 404 ou format invalide (Phone, City, Budget, Objectif, Service Type) :
 *   réintégrer ici avec les vrais IDs / option IDs depuis ClickUp pour les réactiver.
 */
const CUSTOM_FIELD_IDS: Array<
  { id: string; valueAsArray?: boolean } & (
    | { type: "payload"; key: keyof ClickUpLeadPayload }
    | { type: "static"; value: string }
    | { type: "dateSubmitted" }
    | { type: "sourceOptionIndex" }
  )
> = [
  { id: "90e56d9a-9864-4dd3-b6ff-8eadd681995b", type: "payload", key: "name" }, // Full Name
  { id: "cf170d1a-077f-4912-ae5a-9d1609af4cf3", type: "payload", key: "email" }, // Email
  { id: "af3f1e6b-7eee-4fae-9cc8-fd8a648140ca", type: "payload", key: "role" }, // Fonction
  { id: "b0d0af66-e11d-4204-b726-e548b525d4e2", type: "dateSubmitted" }, // Date Submitted
  { id: "ce16924f-be03-463f-a368-93d6051004b8", type: "sourceOptionIndex" }, // Source (CLICKUP_SOURCE_OPTION_INDEX)
  { id: "ed40c77d-29fc-4681-8eb6-5578ceb9a761", type: "payload", key: "company" }, // Établissement
  { id: "f8705cd4-72d4-4db8-8be4-f7d024a22853", type: "payload", key: "sector" }, // Secteur d'activité
  { id: "6ba586e1-62aa-40b7-baf5-307c9cf9b7a0", type: "payload", key: "availability" }, // when you ready?
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

type CustomFieldValue = string | number | (string | number)[];

/**
 * Builds custom_fields array from hardcoded IDs and payload.
 * Tous les champs du formulaire contact sont mappés (valeur ou "—" si vide).
 * Source = option index (env CLICKUP_SOURCE_OPTION_INDEX). Service Type = tableau.
 */
function buildCustomFields(payload: ClickUpLeadPayload): { id: string; value: CustomFieldValue }[] {
  const out: { id: string; value: CustomFieldValue }[] = [];
  for (const field of CUSTOM_FIELD_IDS) {
    let value: string | number;
    if (field.type === "payload") {
      const raw = payload[field.key];
      value =
        raw !== undefined && raw !== "" ? (typeof raw === "string" ? raw : String(raw)) : EMPTY_PLACEHOLDER;
    } else if (field.type === "static") {
      value = field.value;
    } else if (field.type === "sourceOptionIndex") {
      const idx = Number(process.env.CLICKUP_SOURCE_OPTION_INDEX);
      if (Number.isNaN(idx) || idx < 0) continue;
      value = idx;
    } else {
      value = Date.now();
    }
    const finalValue: CustomFieldValue = field.valueAsArray ? [value] : value;
    out.push({ id: field.id, value: finalValue });
  }
  return out;
}

/**
 * Après création de la tâche, remplit chaque champ personnalisé via Set Custom Field Value.
 * value peut être string, number ou array (ex: Service Type).
 */
async function setCustomFieldsAfterCreate(
  taskId: string,
  customFields: { id: string; value: CustomFieldValue }[],
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

  // Create task WITHOUT custom_fields to avoid 404 "Cannot find the custom field" (FIELD_058)
  // when one of the field IDs is invalid; then set each field one by one so invalid IDs only log a warning.
  const createBody = { name, description, status: CLICKUP_STATUS };

  let res = await fetch(`${BASE_URL}/list/${CLICKUP_LIST_ID}/task`, {
    method: "POST",
    headers,
    body: JSON.stringify(createBody),
  });

  if (!res.ok && res.status === 400) {
    const text = await res.text();
    const isStatusError = text.includes("CRTSK_001") || text.toLowerCase().includes("status");
    if (isStatusError) {
      res = await fetch(`${BASE_URL}/list/${CLICKUP_LIST_ID}/task`, {
        method: "POST",
        headers,
        body: JSON.stringify({ name, description }),
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
