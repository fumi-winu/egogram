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

function emptyAnswers(): AnswerValue[] {
  return Array.from({ length: QUESTIONS.length }, () => 1);
}

export function ExistentialApp() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerValue[]>(emptyAnswers);

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

  const handleAnswer = (value: AnswerValue) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = value;
    setAnswers(nextAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push(buildResultPath(diagnose(nextAnswers)));
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
    <PageShell>
      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "question" && question && (
        <QuestionScreen
          question={question}
          currentIndex={currentIndex}
          total={QUESTIONS.length}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}
    </PageShell>
  );
}
