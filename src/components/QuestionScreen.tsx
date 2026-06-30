import {
  type AnswerValue,
  type Question,
  ANSWER_OPTIONS,
  EGOGRAM_INFO,
} from "@/lib/egogram";

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  total: number;
  onAnswer: (value: AnswerValue) => void;
}

export function QuestionScreen({
  question,
  currentIndex,
  total,
  onAnswer,
}: QuestionScreenProps) {
  const progress = ((currentIndex + 1) / total) * 100;
  const typeInfo = EGOGRAM_INFO[question.type];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 sm:p-10">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
          <span>
            質問 {currentIndex + 1} / {total}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `${typeInfo.color}20`,
              color: typeInfo.color,
            }}
          >
            {question.type} · {typeInfo.nameJa}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="mb-8 text-xl font-semibold leading-relaxed text-slate-800 sm:text-2xl">
        {question.text}
      </h2>

      <div className="flex flex-col gap-3">
        {ANSWER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onAnswer(option.value)}
            className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-left text-lg font-medium text-slate-700 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="mr-3 text-sm text-slate-400">
              {option.value}点
            </span>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
