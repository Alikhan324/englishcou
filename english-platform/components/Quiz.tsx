"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type Props = {
  questions: Question[];
};

export default function Quiz({ questions }: Props) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  function chooseAnswer(questionIndex: number, answer: string) {
    if (isSubmitted) return;

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  }

  function checkQuiz() {
    setIsSubmitted(true);
  }

  function resetQuiz() {
    setSelectedAnswers(Array(questions.length).fill(""));
    setIsSubmitted(false);
  }

  const score = questions.reduce((total, question, index) => {
    if (selectedAnswers[index] === question.correctAnswer) {
      return total + 1;
    }

    return total;
  }, 0);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
      <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Quiz</h2>

      <p className="text-muted mb-6 leading-relaxed">
        Сабақты түсінгеніңді тексеру үшін сұрақтарға жауап бер.
      </p>

      <div className="space-y-6">
        {questions.map((question, questionIndex) => (
          <div
            key={question.question}
            className="rounded-2xl border border-border/80 bg-accent-soft/50 p-5 dark:bg-accent-soft/25"
          >
            <h3 className="mb-4 font-semibold text-foreground">
              {questionIndex + 1}. {question.question}
            </h3>

            <div className="grid gap-3">
              {question.options.map((option) => {
                const isSelected = selectedAnswers[questionIndex] === option;
                const isCorrect = option === question.correctAnswer;
                const isWrong = isSubmitted && isSelected && !isCorrect;

                let optionClass =
                  "w-full text-left rounded-xl border border-border px-4 py-3 bg-card text-foreground transition-all duration-300 ease-out hover:border-accent/40 hover:bg-accent-soft/40";

                if (isSelected && !isSubmitted) {
                  optionClass =
                    "w-full text-left rounded-xl border border-accent px-4 py-3 bg-accent text-on-accent transition-all duration-300 ease-out shadow-md";
                }

                if (isSubmitted && isCorrect) {
                  optionClass =
                    "w-full text-left rounded-xl border border-accent/45 px-4 py-3 bg-accent text-on-accent transition-all duration-300";
                }

                if (isWrong) {
                  optionClass =
                    "w-full text-left rounded-xl border border-rose-600/40 px-4 py-3 bg-rose-600 text-white transition-all duration-300";
                }

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => chooseAnswer(questionIndex, option)}
                    className={optionClass}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!isSubmitted ? (
        <button
          type="button"
          onClick={checkQuiz}
          className="btn-primary mt-6 w-full rounded-xl py-3 text-sm"
        >
          Check answers
        </button>
      ) : (
        <div className="mt-6">
          <div className="mb-4 rounded-2xl border border-accent/25 bg-accent-soft/60 p-5 dark:bg-accent-soft/25">
            <h3 className="mb-1 text-xl font-semibold text-accent-soft-fg">
              Your score: {score}/{questions.length}
            </h3>

            <p className="text-muted">
              {score === questions.length
                ? "Керемет! Барлығы дұрыс."
                : "Жақсы! Қате жауаптарды қарап, қайта көр."}
            </p>
          </div>

          <button
            type="button"
            onClick={resetQuiz}
            className="w-full rounded-xl border border-border bg-foreground py-3 font-semibold text-background transition-all duration-300 ease-out hover:bg-accent hover:text-on-accent"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
