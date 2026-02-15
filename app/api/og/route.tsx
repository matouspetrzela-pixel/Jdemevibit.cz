import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Jdemevibit";
    const tool = searchParams.get("tool") || "";
    const category = searchParams.get("category") || "use-case";

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
            backgroundColor: "#0f1217",
            backgroundImage: "linear-gradient(to bottom, #0f1217, #1a1d24)",
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
                  color: "#ef2c28",
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
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
