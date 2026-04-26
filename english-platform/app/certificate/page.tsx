"use client";

import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CertificatePage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

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

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const isCompleted = completedCount >= totalLessons && totalLessons > 0;

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
        <div className="mb-12 text-center">
          <p className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Certificate
          </p>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl mb-4">
            Course completion certificate
          </h1>

          <p className="mx-auto max-w-xl text-muted text-lg leading-relaxed">
            Барлық сабақтарды аяқтасаң, сертификат ашылады.
          </p>
        </div>

        {isCompleted ? (
          <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-accent/35 bg-card p-10 text-center shadow-lg md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
            />
            <p className="font-display relative text-xs font-bold uppercase tracking-[0.35em] text-accent">
              Fazyl Academy
            </p>

            <h2 className="font-display relative mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Certificate of Completion
            </h2>

            <p className="relative mt-4 text-muted">This certificate is proudly presented to</p>

            <h3 className="font-display relative mt-6 text-3xl font-semibold text-accent md:text-4xl">
              Student
            </h3>

            <p className="relative mx-auto mt-6 max-w-lg text-muted leading-relaxed">
              for successfully completing the English learning course.
            </p>

            <div className="relative mt-10 grid gap-4 text-sm text-muted md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-accent-soft/30 p-4 dark:bg-accent-soft/10">
                Completed lessons: {completedCount}
              </div>

              <div className="rounded-2xl border border-border bg-accent-soft/30 p-4 dark:bg-accent-soft/10">
                Total lessons: {totalLessons}
              </div>

              <div className="rounded-2xl border border-border bg-accent-soft/30 p-4 dark:bg-accent-soft/10">
                Status: Completed
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="font-display mb-5 text-4xl text-muted" aria-hidden>
              ◇
            </div>

            <h2 className="font-display mb-3 text-3xl font-semibold text-foreground">Certificate is locked</h2>

            <p className="mb-6 text-muted leading-relaxed">
              Сертификат алу үшін барлық сабақтарды аяқта.
            </p>

            <p className="mb-8 font-semibold text-accent">
              Progress: {completedCount}/{totalLessons} lessons
            </p>

            <Link href="/dashboard" className="btn-primary inline-block rounded-xl px-8 py-3 text-sm">
              Go to dashboard
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
