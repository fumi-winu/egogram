"use client";

import { useState } from "react";
import {
  type AnswerValue,
  type Screen,
  QUESTIONS,
  calculateScores,
} from "@/lib/egogram";
import { StartScreen } from "./StartScreen";
import { QuestionScreen } from "./QuestionScreen";
import { ResultScreen } from "./ResultScreen";

export function EgogramApp() {
  const [screen, setScreen] = useState<Screen>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerValue[]>(
    Array(QUESTIONS.length).fill(0) as AnswerValue[]
  );

  const handleStart = () => {
    setScreen("question");
    setCurrentIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(0) as AnswerValue[]);
  };

  const handleAnswer = (value: AnswerValue) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = value;
    setAnswers(nextAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setScreen("result");
    }
  };

  const handleRestart = () => {
    setScreen("start");
    setCurrentIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(0) as AnswerValue[]);
  };

  const scores = calculateScores(answers);

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-10">
      <div className="w-full max-w-2xl">
        {screen === "start" && <StartScreen onStart={handleStart} />}
        {screen === "question" && (
          <QuestionScreen
            question={QUESTIONS[currentIndex]}
            currentIndex={currentIndex}
            total={QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        )}
        {screen === "result" && (
          <ResultScreen scores={scores} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
