import {
  type EgogramType,
  EGOGRAM_INFO,
  MAX_SCORE_PER_TYPE,
} from "@/lib/egogram";

interface RadarChartProps {
  scores: Record<EgogramType, number>;
}

const TYPES: EgogramType[] = ["CP", "NP", "A", "FC", "AC"];

export function RadarChart({ scores }: RadarChartProps) {
  const size = 280;
  const center = size / 2;
  const radius = 100;
  const levels = 4;

  const angleStep = (2 * Math.PI) / TYPES.length;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / MAX_SCORE_PER_TYPE) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = Array.from({ length: levels }, (_, i) => {
    const level = i + 1;
    const points = TYPES.map((_, index) => {
      const angle = startAngle + index * angleStep;
      const r = (level / levels) * radius;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    }).join(" ");
    return points;
  });

  const dataPoints = TYPES.map((type, index) =>
    getPoint(index, scores[type])
  );
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-72 w-72"
        aria-label="エゴグラムレーダーチャート"
      >
        {gridLevels.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        {TYPES.map((type, index) => {
          const angle = startAngle + index * angleStep;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const labelX = center + (radius + 24) * Math.cos(angle);
          const labelY = center + (radius + 24) * Math.sin(angle);
          return (
            <g key={type}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-600 text-[11px] font-semibold"
              >
                {type}
              </text>
            </g>
          );
        })}

        <polygon
          points={dataPolygon}
          fill="rgba(99, 102, 241, 0.25)"
          stroke="#6366f1"
          strokeWidth="2"
        />

        {dataPoints.map((point, index) => (
          <circle
            key={TYPES[index]}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={EGOGRAM_INFO[TYPES[index]].color}
          />
        ))}
      </svg>
    </div>
  );
}
