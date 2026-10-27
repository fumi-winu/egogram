"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type AnswerValue,
  type Screen,
  QUESTIONS,
  diagnose,
} from "@/lib/existential";
import { buildResultPath } from "@/lib/result-url";
import { PageShell } from "./PageShell";
import { StartScreen } from "./StartScreen";
import { QuestionScreen } from "./QuestionScreen";

const RESET_EVENT = "existential-reset";

function emptyAnswers(): (AnswerValue | undefined)[] {
  return Array.from({ length: QUESTIONS.length }, () => undefined);
}

export function ExistentialApp() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(AnswerValue | undefined)[]>(emptyAnswers);

  useEffect(() => {
    const onReset = () => {
      setScreen("start");
      setCurrentIndex(0);
      setAnswers(emptyAnswers());
    };
    window.addEventListener(RESET_EVENT, onReset);
    return () => window.removeEventListener(RESET_EVENT, onReset);
  }, []);

  const handleStart = () => {
    setScreen("question");
    setCurrentIndex(0);
    setAnswers(emptyAnswers());
  };

  const handleSelect = (value: AnswerValue) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = value;
    setAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (answers[currentIndex] === undefined) return;
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const completed = answers.filter((value): value is AnswerValue => value !== undefined);
      if (completed.length === QUESTIONS.length) {
        router.push(buildResultPath(diagnose(completed)));
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return;
    }
    setScreen("start");
  };

  const question = QUESTIONS[currentIndex];

  return (
    <PageShell size={screen === "start" ? "xl" : "md"}>
      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "question" && question && (
        <QuestionScreen
          question={question}
          currentIndex={currentIndex}
          total={QUESTIONS.length}
          answer={answers[currentIndex]}
          onSelect={handleSelect}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
    </PageShell>
  );
}
