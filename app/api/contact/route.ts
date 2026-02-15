import { NextRequest, NextResponse } from "next/server";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xkovrywy";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") params.append(key, value);
    }
    const replyTo = formData.get("email");
    if (replyTo && typeof replyTo === "string") params.set("_replyto", replyTo);
    params.set("_subject", (formData.get("_subject") as string) || "Nová zpráva z webu");

    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: params.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[api/contact] Chyba při předání Formspree:", err);
    return NextResponse.json(
      { error: "Chyba serveru" },
      { status: 500 }
    );
  }
}
