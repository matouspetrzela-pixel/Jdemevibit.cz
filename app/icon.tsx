import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

const CYAN = "#00f0ff";
const VIOLET = "#a855f7";

/** Favicon: black squircle tile, JV (J white, V gradient), accent bar. */
export default function Icon() {
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
          borderRadius: 22,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
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
            marginTop: 6,
            width: "58%",
            height: 4,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${CYAN} 0%, ${VIOLET} 100%)`,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
