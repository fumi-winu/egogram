import {
  type EgogramType,
  EGOGRAM_INFO,
  MAX_SCORE_PER_TYPE,
  getDominantType,
} from "@/lib/egogram";
import { BarChart } from "./BarChart";
import { RadarChart } from "./RadarChart";

interface ResultScreenProps {
  scores: Record<EgogramType, number>;
  onRestart: () => void;
}

const TYPES: EgogramType[] = ["CP", "NP", "A", "FC", "AC"];

export function ResultScreen({ scores, onRestart }: ResultScreenProps) {
  const dominant = getDominantType(scores);
  const dominantInfo = EGOGRAM_INFO[dominant];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 sm:p-10">
      <div className="mb-6 text-center">
        <p className="mb-2 text-sm font-medium text-slate-500">診断結果</p>
        <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          あなたのエゴグラム
        </h2>
        <p className="text-slate-600">
          最も高い指標は{" "}
          <span
            className="font-bold"
            style={{ color: dominantInfo.color }}
          >
            {dominant}（{dominantInfo.nameJa}）
          </span>
          です
        </p>
      </div>

      <div className="mb-8 grid gap-8 sm:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-slate-50 p-4">
          <RadarChart scores={scores} />
        </div>
        <div className="flex items-center">
          <BarChart scores={scores} />
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">各指標の解説</h3>
        {TYPES.map((type) => {
          const info = EGOGRAM_INFO[type];
          const score = scores[type];
          const isHigh = score >= MAX_SCORE_PER_TYPE / 2;

          return (
            <div
              key={type}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-white"
                  style={{ backgroundColor: info.color }}
                >
                  {type}
                </span>
                <span className="font-semibold text-slate-800">
                  {info.nameJa}
                </span>
                <span className="text-sm text-slate-500">
                  {score}点
                </span>
              </div>
              <p className="mb-2 text-sm text-slate-600">{info.description}</p>
              <p className="text-sm text-slate-700">
                {isHigh ? info.highScore : info.lowScore}
              </p>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="w-full rounded-xl border border-slate-200 bg-white px-6 py-4 text-lg font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        もう一度診断する
      </button>
    </div>
  );
}
