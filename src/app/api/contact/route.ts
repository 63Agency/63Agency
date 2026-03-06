import { NextRequest, NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/emailService";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: unknown;
};

function stringVal(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    const name = stringVal(body.name);
    const email = stringVal(body.email);
    const phone = stringVal(body.phone);
    const message = stringVal(body.message);
    const city = stringVal(body.city);
    const company = stringVal(body.company);
    const employees = stringVal(body.employees);
    const role = stringVal(body.role);
    const objective = stringVal(body.objective);
    const timing = stringVal(body.timing);
    const campaigns = stringVal(body.campaigns);
    const sector = stringVal(body.sector);
    const establishment = stringVal(body.establishment);

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    await sendContactEmails({
      name,
      email,
      phone,
      message: message || undefined,
      city: city || undefined,
      company: company || undefined,
      employees: employees || undefined,
      role: role || undefined,
      objective: objective || undefined,
      timing: timing || undefined,
      campaigns: campaigns || undefined,
      sector: sector || undefined,
      establishment: establishment || undefined,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
