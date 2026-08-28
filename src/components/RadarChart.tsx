import {
  type Factor,
  FACTOR_INFO,
  FACTOR_ORDER,
  MAX_SCORE_PER_FACTOR,
} from "@/lib/existential";

interface RadarChartProps {
  scores: Record<Factor, number>;
}

export function RadarChart({ scores }: RadarChartProps) {
  const size = 320;
  const center = size / 2;
  const radius = 96;
  const levels = 5;

  const angleStep = (2 * Math.PI) / FACTOR_ORDER.length;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / MAX_SCORE_PER_FACTOR) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getLabelAnchor = (index: number) => {
    const angle = startAngle + index * angleStep;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const textAnchor: "start" | "middle" | "end" =
      cos > 0.15 ? "start" : cos < -0.15 ? "end" : "middle";
    return {
      x: center + (radius + 28) * cos,
      y: center + (radius + 26) * sin,
      textAnchor,
      dy: sin > 0.15 ? 4 : sin < -0.15 ? -2 : 0,
    };
  };

  const gridLevels = Array.from({ length: levels }, (_, i) => {
    const level = i + 1;
    const points = FACTOR_ORDER.map((_, index) => {
      const angle = startAngle + index * angleStep;
      const r = (level / levels) * radius;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    }).join(" ");
    return points;
  });

  const dataPoints = FACTOR_ORDER.map((factor, index) =>
    getPoint(index, scores[factor]),
  );
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-72 w-72 sm:h-80 sm:w-80"
        aria-label="実存的動機のレーダーチャート"
      >
        {gridLevels.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="var(--chart-grid)"
            strokeWidth="1"
          />
        ))}

        {FACTOR_ORDER.map((factor, index) => {
          const angle = startAngle + index * angleStep;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const label = getLabelAnchor(index);
          const info = FACTOR_INFO[factor];
          return (
            <g key={factor}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="var(--chart-axis)"
                strokeWidth="1"
              />
              <text
                x={label.x}
                y={label.y + label.dy}
                textAnchor={label.textAnchor}
                dominantBaseline="middle"
                className="text-[11px] font-medium tracking-wider"
                fill={info.color}
              >
                {info.shortLabel}
              </text>
            </g>
          );
        })}

        <polygon
          points={dataPolygon}
          fill="var(--chart-fill)"
          stroke="var(--chart-stroke)"
          strokeWidth="2"
        />

        {dataPoints.map((point, index) => {
          const factor = FACTOR_ORDER[index];
          if (!factor) return null;
          return (
            <circle
              key={factor}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={FACTOR_INFO[factor].color}
            />
          );
        })}
      </svg>
    </div>
  );
}
