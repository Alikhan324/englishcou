"use client";

import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { translations } from "@/data/translations";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "kz" | "ru" | "en";

type User = {
  name: string;
  email: string;
  isPremium: boolean;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;
    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth-user");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(JSON.parse(savedUser));

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

  function logout() {
    localStorage.removeItem("auth-user");
    window.location.href = "/login";
  }

  function upgradeToPremium() {
    if (!user) return;

    const updatedUser = {
      ...user,
      isPremium: true,
    };

    localStorage.setItem("auth-user", JSON.stringify(updatedUser));

    const registeredUser = localStorage.getItem("registered-user");

    if (registeredUser) {
      const parsed = JSON.parse(registeredUser);
      localStorage.setItem(
        "registered-user",
        JSON.stringify({
          ...parsed,
          isPremium: true,
        })
      );
    }

    setUser(updatedUser);
    alert("Premium activated!");
  }

  if (!user) {
    return null;
  }

  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;

  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-5xl px-6 py-14 md:py-16">
        <div className="mb-12 max-w-2xl">
          <p className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {t.profile}
          </p>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl mb-4">
            {t.profileTitle}
          </h1>

          <p className="text-muted text-lg leading-relaxed">
            {t.dashboardText}
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:col-span-1">
            <div className="font-display mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-accent-soft text-3xl text-accent">
              {user.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>

            <h2 className="font-display text-2xl font-semibold text-foreground">{user.name}</h2>

            <p className="mb-5 mt-2 text-muted">{user.email}</p>

            <span
              className={
                user.isPremium
                  ? "badge-premium"
                  : "inline-block rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent-soft-fg"
              }
            >
              {user.isPremium ? t.premiumUser : t.freeUser}
            </span>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:col-span-2 md:p-8">
            <h2 className="font-display mb-6 text-2xl font-semibold text-foreground">{t.yourProgress}</h2>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-accent-soft/40 p-4 dark:bg-accent-soft/15">
                <p className="text-sm text-muted">{t.completed}</p>
                <h3 className="font-display text-3xl font-semibold text-accent">{completedCount}</h3>
              </div>

              <div className="rounded-2xl border border-border/60 bg-accent-soft/40 p-4 dark:bg-accent-soft/15">
                <p className="text-sm text-muted">{t.totalLessons}</p>
                <h3 className="font-display text-3xl font-semibold text-accent">{totalLessons}</h3>
              </div>

              <div className="rounded-2xl border border-border/60 bg-accent-soft/40 p-4 dark:bg-accent-soft/15">
                <p className="text-sm text-muted">{t.progress}</p>
                <h3 className="font-display text-3xl font-semibold text-accent">{progress}%</h3>
              </div>
            </div>

            <div className="mb-4 h-4 w-full overflow-hidden rounded-full bg-accent-soft">
              <div
                className="h-4 rounded-full bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-muted">
              {t.completedLessons}: {completedCount}/{totalLessons}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 className="font-display mb-6 text-2xl font-semibold text-foreground">{t.profile}</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dashboard"
              className="btn-primary block rounded-xl py-3 text-center text-sm"
            >
              {t.dashboard}
            </Link>

            <button
              type="button"
              onClick={upgradeToPremium}
              className="btn-primary block w-full rounded-xl py-3 text-center text-sm"
            >
              {t.premium}
            </button>

            <Link
              href="/certificate"
              className="block w-full rounded-xl bg-deep py-3 text-center text-sm font-semibold text-on-deep transition-colors duration-300 hover:bg-deep-hover"
            >
              {t.certificate}
            </Link>

            <button
              type="button"
              onClick={logout}
              className="block w-full rounded-xl border border-rose-600/50 bg-rose-600 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-rose-700"
            >
              {t.logout}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
