"use client";

import { lessons } from "@/data/lessons";
import { quizzes } from "@/data/quizzes";
import { translations } from "@/data/translations";
import { currentUser } from "@/data/user";
import Link from "next/link";
import { notFound } from "next/navigation";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import Quiz from "@/components/Quiz";
import { useEffect, useState } from "react";

type Language = "kz" | "ru" | "en";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function LessonPage({ params }: Props) {
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;
    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  return <LessonContent params={params} language={language} t={t} />;
}

async function LessonContent({ params, language, t }: { params: Promise<{ id: string }>; language: Language; t: typeof translations.kz }) {
  const { id } = await params;
  const lessonId = Number(id);

  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    notFound();
  }

  if (lesson.isPremium && !currentUser.isPremium) {
    return (
      <main className="page-shell">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="card-locked rounded-3xl p-10 text-center shadow-sm">
            <div className="font-display mb-5 text-5xl text-accent" aria-hidden>
              ◆
            </div>

            <h1 className="font-display mb-3 text-3xl font-semibold text-foreground">
              {t.premiumLesson}
            </h1>

            <p className="mb-8 text-muted leading-relaxed">
              {t.premiumLessonText}
            </p>

            <Link href="/pricing" className="btn-primary inline-block rounded-xl px-8 py-3 text-sm">
              {t.viewPremiumPlan}
            </Link>

            <div className="mt-8">
              <Link
                href={`/courses/${lesson.courseId}`}
                className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                ← {t.backToCourse}
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const courseLessons = lessons.filter(
    (item) => item.courseId === lesson.courseId
  );

  const currentIndex = courseLessons.findIndex(
    (item) => item.id === lesson.id
  );

  const previousLesson = courseLessons[currentIndex - 1];
  const nextLesson = courseLessons[currentIndex + 1];

  const quiz = quizzes.find((item) => item.lessonId === lesson.id);

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-4xl px-6 py-14">
        <Link
          href={`/courses/${lesson.courseId}`}
          className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          ← {t.backToLessons}
        </Link>

        <div className="mb-10 mt-8">
          <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-soft-fg">
            {lesson.badge}
          </span>

          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {lesson.shortTitle}
          </h1>

          <p className="mt-4 text-lg text-muted leading-relaxed">{lesson.description}</p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">{t.kazakhExplanation}</h2>
            <p className="leading-relaxed text-muted">{lesson.contentKz}</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">{t.russianExplanation}</h2>
            <p className="leading-relaxed text-muted">{lesson.contentRu}</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-4 text-2xl font-semibold text-foreground">{t.examples}</h2>

            <div className="grid gap-4 sm:grid-cols-3">
              {lesson.examples.map((example) => (
                <div
                  key={example.letter}
                  className="rounded-2xl border border-border bg-accent-soft/50 p-4 text-center transition-transform duration-300 hover:-translate-y-0.5 dark:bg-accent-soft/20"
                >
                  <p className="font-display text-3xl font-semibold text-accent">{example.letter}</p>
                  <p className="text-sm text-muted">{example.word}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">{t.practice}</h2>

            <p className="mb-4 text-muted">{t.practiceText}</p>

            <ul className="space-y-2 text-foreground/90">
              {lesson.examples.map((example) => (
                <li key={example.letter}>
                  {example.letter} — {example.word}
                </li>
              ))}
            </ul>
          </div>

          {quiz && <Quiz questions={quiz.questions} />}
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">{t.lessonStatus}</h2>
          <p className="mb-5 text-muted">{t.lessonStatusText}</p>

          <LessonCompleteButton courseId={lesson.courseId} lessonId={lesson.id} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {previousLesson ? (
            <Link
              href={`/lessons/${previousLesson.id}`}
              className="btn-ghost rounded-xl px-5 py-3 text-sm font-semibold"
            >
              ← {t.previousLesson}
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link href={`/lessons/${nextLesson.id}`} className="btn-primary rounded-xl px-5 py-3 text-sm">
              {t.nextLesson} →
            </Link>
          ) : (
            <Link
              href={`/courses/${lesson.courseId}`}
              className="rounded-xl bg-deep px-5 py-3 text-sm font-semibold text-on-deep transition-colors duration-300 hover:bg-deep-hover"
            >
              {t.finishCourse}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
