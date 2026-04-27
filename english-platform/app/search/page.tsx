"use client";

import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { translations } from "@/data/translations";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "kz" | "ru" | "en";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;
    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  const searchText = query.toLowerCase();

  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchText) ||
      course.description.toLowerCase().includes(searchText) ||
      course.level.toLowerCase().includes(searchText)
    );
  });

  const filteredLessons = lessons.filter((lesson) => {
    return (
      lesson.title.toLowerCase().includes(searchText) ||
      lesson.description.toLowerCase().includes(searchText) ||
      lesson.shortTitle.toLowerCase().includes(searchText)
    );
  });

  const hasSearch = query.trim().length > 0;

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="mb-12 max-w-2xl">
          <p className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {t.search}
          </p>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl mb-4">
            {t.searchResults}
          </h1>

          <p className="text-muted text-lg leading-relaxed">
            {t.heroText}
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-border bg-card p-2 shadow-sm transition-shadow duration-500 focus-within:border-accent/35 focus-within:shadow-md md:p-2">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-2xl border-0 bg-transparent px-5 py-4 text-base text-foreground outline-none placeholder:text-muted"
          />
        </div>

        {!hasSearch ? (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="font-display mb-2 text-2xl font-semibold text-foreground">{t.search}</h2>
            <p className="text-muted">{t.searchPlaceholder}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className="font-display mb-5 text-2xl font-semibold text-foreground">{t.courses}</h2>

              {filteredCourses.length === 0 ? (
                <p className="text-muted">{t.noResults}</p>
              ) : (
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="block rounded-2xl border border-transparent bg-accent-soft/35 p-4 transition-all duration-300 ease-out hover:border-accent/20 hover:bg-accent-soft dark:bg-accent-soft/15"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{course.title}</h3>
                          <p className="text-sm text-muted">
                            {course.level} • {course.lessons} {t.lessonsCount}
                          </p>
                        </div>

                        <span className="font-semibold text-accent">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
              <h2 className="font-display mb-5 text-2xl font-semibold text-foreground">{t.lessons}</h2>

              {filteredLessons.length === 0 ? (
                <p className="text-muted">{t.noResults}</p>
              ) : (
                <div className="space-y-4">
                  {filteredLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/lessons/${lesson.id}`}
                      className="block rounded-2xl border border-transparent bg-accent-soft/35 p-4 transition-all duration-300 ease-out hover:border-accent/20 hover:bg-accent-soft dark:bg-accent-soft/15"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                          <p className="text-sm text-muted">{lesson.description}</p>
                        </div>

                        <span className="shrink-0 font-semibold text-accent">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
