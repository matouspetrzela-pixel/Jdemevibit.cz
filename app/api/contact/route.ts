import { NextRequest, NextResponse } from "next/server";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "xkovrywy";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = (formData.get("email") as string) || "";
    const body: Record<string, string> = {
      name: (formData.get("name") as string) || "",
      email,
      message: (formData.get("message") as string) || "",
      _subject: (formData.get("_subject") as string) || "Nová zpráva z webu",
      _replyto: email,
    };
    const gotcha = formData.get("_gotcha");
    if (gotcha && typeof gotcha === "string") body._gotcha = gotcha;

    const origin = request.headers.get("origin") || request.headers.get("referer") || "https://www.jdemevibit.cz";
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: origin,
        "User-Agent": request.headers.get("user-agent") || "Mozilla/5.0 (compatible; jdemevibit/1.0)",
      },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("[api/contact] Formspree ne-OK:", res.status, data);
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[api/contact] Chyba při předání Formspree:", err);
    return NextResponse.json(
      { error: "Chyba serveru" },
      { status: 500 }
    );
  }
}
