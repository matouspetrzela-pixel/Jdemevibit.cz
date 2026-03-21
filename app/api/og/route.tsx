import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Jdemevibit";
    const tool = searchParams.get("tool") || "";
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,240,255,0.12), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(168,85,247,0.1), transparent 50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              maxWidth: "1200px",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "900",
                color: "#ffffff",
                textAlign: "center",
                marginBottom: "20px",
                lineHeight: "1.1",
              }}
            >
              {title}
            </h1>
            {tool && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    color: "#7b3beb",
                    backgroundColor: "#7b3beb20",
                    padding: "8px 16px",
                    borderRadius: "8px",
                  }}
                >
                  {tool}
                </span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "40px",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  color: "#00f0ff",
                  fontWeight: "700",
                }}
              >
                jdemevibit
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.log(e instanceof Error ? e.message : String(e));
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
