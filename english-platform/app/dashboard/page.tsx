"use client";

import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { translations } from "@/data/translations";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "kz" | "ru" | "en";

export default function DashboardPage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;
    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const allCompleted: number[] = [];

    courses.forEach((course) => {
      const saved = localStorage.getItem(
        `completed-lessons-course-${course.id}`
      );

      if (saved) {
        const parsed: number[] = JSON.parse(saved);
        allCompleted.push(...parsed);
      }
    });

    setCompletedLessons(allCompleted);
  }, []);

  const t = translations[language];

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;

  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const nextLesson = lessons.find(
    (lesson) => !completedLessons.includes(lesson.id)
  );

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="mb-12 max-w-2xl">
          <p className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {t.dashboard}
          </p>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl mb-4">
            {t.myLearningProgress}
          </h1>

          <p className="text-muted text-lg leading-relaxed">
            {t.dashboardText}
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow duration-500 hover:shadow-md">
            <p className="mb-2 text-sm font-medium text-muted">{t.completedLessons}</p>
            <h2 className="font-display text-4xl font-semibold text-accent">{completedCount}</h2>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow duration-500 hover:shadow-md">
            <p className="mb-2 text-sm font-medium text-muted">{t.totalLessons}</p>
            <h2 className="font-display text-4xl font-semibold text-accent">{totalLessons}</h2>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow duration-500 hover:shadow-md">
            <p className="mb-2 text-sm font-medium text-muted">{t.progress}</p>
            <h2 className="font-display text-4xl font-semibold text-accent">{progress}%</h2>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-foreground">{t.overallProgress}</h2>
            <span className="font-semibold text-accent">
              {completedCount}/{totalLessons}
            </span>
          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-accent-soft">
            <div
              className="h-4 rounded-full bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">{t.continueLesson}</h2>

            {nextLesson ? (
              <>
                <p className="mb-5 text-muted leading-relaxed">
                  <b className="text-foreground">{nextLesson.title}</b>
                </p>

                <Link
                  href={`/lessons/${nextLesson.id}`}
                  className="btn-primary block w-full rounded-xl py-3 text-center text-sm"
                >
                  {t.goToLesson}
                </Link>
              </>
            ) : (
              <>
                <p className="mb-5 text-muted leading-relaxed">
                  {t.noMoreLessons}
                </p>

                <Link
                  href="/courses"
                  className="block w-full rounded-xl bg-deep py-3 text-center text-sm font-semibold text-on-deep transition-all duration-300 ease-out hover:bg-deep-hover"
                >
                  {t.viewCourse}
                </Link>
              </>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-4 text-2xl font-semibold text-foreground">{t.course}</h2>

            <div className="space-y-3">
              {courses.map((course) => {
                const courseLessons = lessons.filter(
                  (lesson) => lesson.courseId === course.id
                );

                const completedInCourse = courseLessons.filter((lesson) =>
                  completedLessons.includes(lesson.id)
                ).length;

                return (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="block rounded-2xl border border-transparent bg-accent-soft/40 p-4 transition-all duration-300 ease-out hover:border-accent/25 hover:bg-accent-soft"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{course.title}</h3>

                        <p className="text-sm text-muted">
                          {completedInCourse}/{courseLessons.length} {t.lessons}
                        </p>
                      </div>

                      <span className="font-semibold text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
