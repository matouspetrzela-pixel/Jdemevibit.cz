import { NextRequest, NextResponse } from "next/server";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xkovrywy";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const replyTo = formData.get("email");
    if (replyTo && typeof replyTo === "string") {
      formData.set("_replyto", replyTo);
    }
    if (!formData.get("_subject")) {
      formData.set("_subject", "Nová zpráva z webu");
    }
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
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
