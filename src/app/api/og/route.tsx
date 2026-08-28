import { ImageResponse } from "next/og";
import {
  FACTOR_INFO,
  FACTOR_ORDER,
  MAX_SCORE_PER_FACTOR,
  type DiagnosisResult,
  type Factor,
} from "@/lib/existential";
import { loadOgFonts } from "@/lib/og-font";
import { parseResultSearchParams } from "@/lib/result-url";

export const alt = "実存的動機診断";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#c4a574";
const CREAM = "#f5f5f4";
const MUTED = "#a8a29e";
const TRACK = "rgba(255,255,255,0.12)";
const GRID = "#3f3f46";
const AXIS = "#52525b";
const FILL = "rgba(196, 165, 116, 0.22)";

const FACTOR_HEX: Record<Factor, string> = {
  creative: "#d4a373",
  experiential: "#7eb8c9",
  attitudinal: "#b8a1c9",
  autonomy: "#9aa3b2",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = parseResultSearchParams(searchParams);
  const fonts = await loadOgFonts();

  try {
    return new ImageResponse(renderOgCard(result), {
      ...size,
      fonts,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(`Failed to generate the image: ${message}`, {
      status: 500,
    });
  }
}

function renderOgCard(result: DiagnosisResult | null) {
  const serif = "Noto Serif JP";
  const sans = "Noto Sans JP";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#07090c",
        backgroundImage:
          "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(196,165,116,0.16), transparent 58%), linear-gradient(180deg, #07090c 0%, #111827 100%)",
        color: CREAM,
        padding: 56,
        fontFamily: sans,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          border: "1px solid rgba(196,165,116,0.28)",
          borderRadius: 28,
          padding: "40px 48px",
          backgroundColor: "rgba(9,9,11,0.55)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: GOLD,
                fontSize: 18,
                letterSpacing: "0.32em",
                fontFamily: sans,
              }}
            >
              実存的動機診断
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 6,
                width: 88,
                height: 3,
                backgroundColor: GOLD,
                borderRadius: 999,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              color: MUTED,
              fontSize: 16,
              letterSpacing: "0.18em",
            }}
          >
            EXISTENTIAL MOTIVATION
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, gap: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: serif,
                  fontSize: result ? 58 : 48,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                {result ? result.type.name : "生きる意味の四因子診断"}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 10,
                  color: MUTED,
                  fontSize: 22,
                  letterSpacing: "0.12em",
                }}
              >
                {result ? result.type.nameEn : "Existential Motivation Test"}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 18,
                  color: "#d6d3d1",
                  fontSize: 22,
                  lineHeight: 1.5,
                }}
              >
                {result
                  ? result.type.tagline
                  : "創造・体験・態度・実存的自律から、意味への意志を読む。"}
              </div>
            </div>

            {result ? renderBars(result) : renderFactorLegend()}
          </div>

          {result ? renderRadar(result) : null}
        </div>
      </div>
    </div>
  );
}

function renderBars(result: DiagnosisResult) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 28,
        gap: 14,
      }}
    >
      {FACTOR_ORDER.map((factor) => {
        const score = result.scores[factor];
        const pct = Math.round((score / MAX_SCORE_PER_FACTOR) * 100);
        return (
          <div
            key={factor}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 18,
              }}
            >
              <span style={{ color: FACTOR_HEX[factor] }}>
                {FACTOR_INFO[factor].name}
              </span>
              <span style={{ color: MUTED }}>
                {score}/{MAX_SCORE_PER_FACTOR}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                height: 10,
                backgroundColor: TRACK,
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: `${pct}%`,
                  height: 10,
                  backgroundColor: FACTOR_HEX[factor],
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderFactorLegend() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 32,
      }}
    >
      {FACTOR_ORDER.map((factor) => (
        <div
          key={factor}
          style={{
            display: "flex",
            alignItems: "center",
            border: `1px solid ${FACTOR_HEX[factor]}55`,
            borderRadius: 999,
            padding: "8px 16px",
            color: FACTOR_HEX[factor],
            fontSize: 18,
          }}
        >
          {FACTOR_INFO[factor].name}
        </div>
      ))}
    </div>
  );
}

function polar(
  index: number,
  radius: number,
  ratio: number,
  cx: number,
  cy: number,
) {
  const angle = -Math.PI / 2 + (index * Math.PI) / 2;
  return {
    x: cx + Math.cos(angle) * radius * ratio,
    y: cy + Math.sin(angle) * radius * ratio,
  };
}

function toPoints(points: { x: number; y: number }[]): string {
  return points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
}

function renderRadar(result: DiagnosisResult) {
  const sizePx = 340;
  const cx = 170;
  const cy = 170;
  const radius = 108;
  const levels = 4;

  const grids = Array.from({ length: levels }, (_, i) => {
    const ratio = (i + 1) / levels;
    return toPoints(
      FACTOR_ORDER.map((_, index) => polar(index, radius, ratio, cx, cy)),
    );
  });

  const dataPoints = FACTOR_ORDER.map((factor, index) =>
    polar(index, radius, result.scores[factor] / MAX_SCORE_PER_FACTOR, cx, cy),
  );
  const axisEnds = FACTOR_ORDER.map((_, index) => polar(index, radius, 1, cx, cy));
  const labelPos = FACTOR_ORDER.map((_, index) =>
    polar(index, radius + 28, 1, cx, cy),
  );

  return (
    <div
      style={{
        display: "flex",
        width: sizePx,
        height: sizePx,
        position: "relative",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={sizePx} height={sizePx}>
        {grids.map((points) => (
          <polygon
            key={points}
            points={points}
            fill="none"
            stroke={GRID}
            strokeWidth="1"
          />
        ))}
        {axisEnds.map((end) => (
          <line
            key={`${end.x}-${end.y}`}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke={AXIS}
            strokeWidth="1"
          />
        ))}
        <polygon
          points={toPoints(dataPoints)}
          fill={FILL}
          stroke={GOLD}
          strokeWidth="3"
        />
        {dataPoints.map((point, index) => {
          const factor = FACTOR_ORDER[index];
          if (!factor) return null;
          return (
            <circle
              key={factor}
              cx={point.x}
              cy={point.y}
              r="6"
              fill={FACTOR_HEX[factor]}
            />
          );
        })}
      </svg>
      {FACTOR_ORDER.map((factor, index) => {
        const pos = labelPos[index];
        if (!pos) return null;
        return (
          <div
            key={factor}
            style={{
              display: "flex",
              position: "absolute",
              left: pos.x - 28,
              top: pos.y - 12,
              width: 56,
              justifyContent: "center",
              color: FACTOR_HEX[factor],
              fontSize: 16,
            }}
          >
            {FACTOR_INFO[factor].shortLabel}
          </div>
        );
      })}
    </div>
  );
}
