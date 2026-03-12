/**
 * ClickUp: إنشاء lead من formulaire contact.
 * بدون status في الطلب لتجنب CRTSK_001؛ الحقول تُرسل في custom_fields ثم إضافيات.
 */
const CLICKUP_LIST_ID = "901216143943";
const BASE_URL = "https://api.clickup.com/api/v2";

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

function getAuthHeader(token: string): string {
  return token.startsWith("pk_") ? token : `Bearer ${token}`;
}

export async function createClickUpLead(payload: ClickUpLeadPayload): Promise<boolean> {
  const token = process.env.CLICKUP_API_TOKEN;
  if (!token?.trim()) {
    console.warn("[ClickUp] CLICKUP_API_TOKEN is not set; skipping.");
    return false;
  }

  const description = `Email: ${payload.email}
Phone: ${payload.phone || "-"}
City: ${payload.city || "-"}
Company: ${payload.company || "-"}
Role: ${payload.role || "-"}
Sector: ${payload.sector || "-"}
Budget: ${payload.budget || "-"}
Service: ${payload.service || "-"}
Availability: ${payload.availability || "-"}
Objective: ${payload.objective || "-"}`;

  const custom_fields = [
    { id: "cf170d1a-077f-4912-ae5a-9d1609af4cf3", value: payload.email },
    { id: "90e56d9a-9864-4dd3-b6ff-8eadd681995b", value: payload.name },
    { id: "af3f1e6b-7eee-4fae-9cc8-fd8a648140ca", value: payload.role || "" },
    { id: "ed40c77d-29fc-4681-8eb6-5578ceb9a761", value: payload.company || "" },
    { id: "f8705cd4-72d4-4db8-8be4-f7d024a22853", value: payload.sector || "" },
    { id: "6ba586e1-62aa-40b7-baf5-307c9cf9b7a0", value: payload.availability || "" },
    { id: "b0d0af66-e11d-4204-b726-e548b525d4e2", value: Date.now() },
  ].filter((f) => f.value !== "" && f.value !== 0);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: getAuthHeader(token),
  };

  // بدون status لتجنب CRTSK_001 — ClickUp يستخدم الحالة الافتراضية للقائمة
  const res = await fetch(`${BASE_URL}/list/${CLICKUP_LIST_ID}/task`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: `Lead: ${payload.name}`,
      description,
      custom_fields,
    }),
  });

  if (!res.ok) {
    console.error("[ClickUp] failed:", res.status, await res.text());
    return false;
  }

  const taskData = await res.json().catch(() => ({}));
  const taskId = taskData?.id ?? taskData?.data?.id;
  if (!taskId) {
    console.error("[ClickUp] no task id in response");
    return false;
  }
  console.log("[ClickUp] task created:", taskId);

  const extraFields = [
    { id: "9f4f7b73-9475-46fe-85a0-b990096cb1d9", value: payload.phone || "" },
    { id: "2564654e-3169-4816-b521-4cf8a9791b84", value: payload.city || "" },
    { id: "c74b47d5-6b1a-4c7d-b237-39b7b6542b6d", value: payload.budget || "" },
    { id: "f4dc469d-dbda-4ceb-b477-c596d13369a7", value: payload.objective || "" },
  ];

  for (const field of extraFields) {
    if (!field.value) continue;
    try {
      const r = await fetch(`${BASE_URL}/task/${taskId}/field/${field.id}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ value: field.value }),
      });
      if (!r.ok) console.warn(`[ClickUp] field ${field.id} failed:`, await r.text());
    } catch (e) {
      console.warn(`[ClickUp] field ${field.id} exception:`, e);
    }
  }

  console.log("[ClickUp] done!");
  return true;
}
