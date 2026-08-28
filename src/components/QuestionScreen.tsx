import {
  type AnswerValue,
  type Question,
  ANSWER_OPTIONS,
} from "@/lib/existential";

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  total: number;
  onAnswer: (value: AnswerValue) => void;
}

const PANEL =
  "rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow)] backdrop-blur-sm sm:p-10";

export function QuestionScreen({
  question,
  currentIndex,
  total,
  onAnswer,
}: QuestionScreenProps) {
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className={PANEL}>
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted">
          <span>
            質問 {currentIndex + 1} / {total}
          </span>
          <span className="text-[11px] tracking-[0.18em] text-subtle">
            5件法
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-track">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="mb-2 font-serif text-xl font-medium leading-relaxed text-heading sm:text-2xl">
        {question.text}
      </h2>
      <p className="mb-8 text-sm text-muted">
        いまの自分に近いものを、直感で選んでください。
      </p>

      <div className="flex flex-col gap-2.5">
        {ANSWER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onAnswer(option.value)}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3.5 text-left text-foreground transition-all hover:border-accent/50 hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-ring-offset"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-xs font-medium text-muted transition-colors group-hover:border-accent/60 group-hover:text-accent">
              {option.value}
            </span>
            <span className="text-base font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
