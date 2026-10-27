import { useEffect, useRef } from "react";
import { type AnswerValue, type Question, ANSWER_OPTIONS } from "@/lib/existential";

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  total: number;
  answer: AnswerValue | undefined;
  onSelect: (value: AnswerValue) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionScreen({ question, currentIndex, total, answer, onSelect, onNext, onBack }: QuestionScreenProps) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentIndex]);
  const progress = Math.round((currentIndex / total) * 100);
  return (
    <div className="question-panel">
      <p className="question-kicker">A MOMENT FOR YOURSELF</p>
      <div className="mb-3 flex justify-between text-xs text-muted"><span>自分を知る、{total}の質問</span><span>{progress}%</span></div>
      <div role="progressbar" aria-label="診断の進捗" aria-valuemin={0} aria-valuemax={total} aria-valuenow={currentIndex} className="h-1.5 overflow-hidden rounded-full bg-track">
        <div className="h-full rounded-full bg-accent transition-all motion-reduce:transition-none" style={{ width: `${progress}%` }} />
      </div>
      <p className="mb-5 mt-9 text-center text-xs tracking-[0.2em] text-accent">QUESTION {String(currentIndex + 1).padStart(2, "0")} / {total}</p>
      <h2 ref={heading} tabIndex={-1} id="question-title" className="min-h-24 text-center font-serif text-xl font-medium leading-relaxed text-heading outline-none sm:text-2xl">{question.text}</h2>
      <p id="answer-hint" className="mb-8 mt-3 text-center text-xs text-muted">理想ではなく、ふだんの自分に近いものを。</p>
      <fieldset aria-labelledby="question-title" aria-describedby="answer-hint">
        <legend className="sr-only">当てはまる度合いを選んでください</legend>
        <div className="mb-4 flex justify-between gap-4 text-xs font-medium"><span className="text-[var(--factor-experiential)]">当てはまらない</span><span className="text-[var(--factor-attitudinal)]">当てはまる</span></div>
        <div className="flex items-center justify-between gap-2">
          {ANSWER_OPTIONS.map((option) => (
            <label key={option.value} className="flex min-h-14 min-w-11 cursor-pointer items-center justify-center">
              <input className="peer sr-only" type="radio" name={`question-${question.id}`} value={option.value} checked={answer === option.value} onChange={() => onSelect(option.value)} aria-label={option.label} />
              <span aria-hidden="true" className={`flex items-center justify-center rounded-full border-2 transition-all peer-checked:bg-current peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent ${option.value < 3 ? "text-[var(--factor-experiential)]" : option.value > 3 ? "text-[var(--factor-attitudinal)]" : "text-muted"} ${option.value === 1 || option.value === 5 ? "h-12 w-12 sm:h-16 sm:w-16" : option.value === 3 ? "h-8 w-8" : "h-10 w-10 sm:h-12 sm:w-12"}`}>
                {answer === option.value && <span className="text-xl text-background">✓</span>}
              </span>
            </label>
          ))}
        </div>
        <p aria-live="polite" className="mt-5 min-h-6 text-center text-sm text-muted">{ANSWER_OPTIONS.find((option) => option.value === answer)?.label ?? "5つの丸から選んでください"}</p>
      </fieldset>
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
        <button type="button" onClick={onBack} className="rounded-lg px-3 py-3 text-sm text-muted hover:text-heading focus-visible:outline-2 focus-visible:outline-accent">← {currentIndex === 0 ? "トップへ" : "前の質問"}</button>
        <button type="button" onClick={onNext} disabled={answer === undefined} className="rounded-lg bg-button px-6 py-3 text-sm font-medium text-button-fg hover:bg-button-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40">{currentIndex === total - 1 ? "診断結果を見る" : "次の質問へ"} →</button>
      </div>
    </div>
  );
}
