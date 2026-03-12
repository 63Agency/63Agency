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
    { id: "3f47fb73-9475-46fc-85a9-b990096cb1d9", value: payload.phone || "" },
    { id: "42586fce-f057-402d-b8f4-10689f6a6a24", value: payload.phone || "" },
    { id: "2564684e-3169-4816-b521-4cf8a9791b84", value: payload.city || "" },
    { id: "c74b47d5-6b1a-4c74-b237-39bf56542b6d", value: payload.budget || "" },
    { id: "f4c4e69d-dbde-4ceb-b477-c596d13363a7", value: payload.objective || "" },
    { id: "ce16924f-be03-463f-a368-93d6051004b8", value: 6 },
    { id: "b0d0af66-e11d-4204-b726-e548b525d4e2", value: Date.now() },
  ].filter((f) => f.value !== "" && f.value !== 0);

  const res = await fetch(`${BASE_URL}/list/${CLICKUP_LIST_ID}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
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

  console.log("[ClickUp] task created successfully!");
  return true;
}