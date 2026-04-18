import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const CYAN = "#00f0ff";
const VIOLET = "#a855f7";

/** Apple touch icon: same JV squircle lockup at higher resolution. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 42,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 78,
            fontWeight: 700,
            fontFamily:
              'ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif',
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#ffffff" }}>J</span>
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${CYAN} 0%, ${VIOLET} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            V
          </span>
        </div>
        <div
          style={{
            marginTop: 12,
            width: "58%",
            height: 7,
            borderRadius: 4,
            background: `linear-gradient(90deg, ${CYAN} 0%, ${VIOLET} 100%)`,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
