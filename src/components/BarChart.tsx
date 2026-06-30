import {
  type EgogramType,
  EGOGRAM_INFO,
  MAX_SCORE_PER_TYPE,
} from "@/lib/egogram";

interface BarChartProps {
  scores: Record<EgogramType, number>;
}

const TYPES: EgogramType[] = ["CP", "NP", "A", "FC", "AC"];

export function BarChart({ scores }: BarChartProps) {
  return (
    <div className="space-y-4">
      {TYPES.map((type) => {
        const info = EGOGRAM_INFO[type];
        const score = scores[type];
        const percentage = (score / MAX_SCORE_PER_TYPE) * 100;

        return (
          <div key={type}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                <span style={{ color: info.color }} className="font-bold">
                  {type}
                </span>
                <span className="ml-2 text-slate-500">{info.nameJa}</span>
              </span>
              <span className="font-semibold text-slate-800">
                {score} / {MAX_SCORE_PER_TYPE}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: info.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
