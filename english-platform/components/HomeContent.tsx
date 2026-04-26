"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { translations } from "@/data/translations";

type Language = "kz" | "ru" | "en";

export default function HomeContent() {
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;

    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  return (
    <main className="page-shell overflow-x-hidden">
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
          <div>
            <div className="animate-rise stagger-1 mb-5 max-w-xs">
              <div className="hero-line w-full" />
            </div>

            <div className="animate-rise stagger-1 inline-flex items-center rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-semibold text-accent-soft-fg backdrop-blur-sm shadow-sm">
              {t.heroBadge}
            </div>

            <h1 className="font-display animate-rise stagger-2 mt-6 text-4xl md:text-6xl lg:text-[3.35rem] font-semibold leading-[1.08] tracking-tight text-foreground">
              {t.heroTitle}
            </h1>

            <p className="animate-rise stagger-3 mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-xl">
              {t.heroText}
            </p>

            <div className="animate-rise stagger-4 mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/courses" className="btn-primary px-8 py-4 rounded-2xl text-center text-base">
                {t.startLearning}
              </Link>

              <Link href="/register" className="btn-ghost px-8 py-4 rounded-2xl text-center text-base">
                {t.createAccount}
              </Link>
            </div>
          </div>

          <div className="animate-rise stagger-3 relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/12 via-transparent to-accent-soft/40 blur-2xl opacity-80 dark:opacity-60"
            />
            <div className="card-elevated relative rounded-[1.75rem] p-8 md:p-10">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8">
                {t.whatYouLearn}
              </h2>

              <div className="space-y-4">
                <div className="feature-tile animate-fade stagger-2">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {t.grammar}
                  </h3>
                  <p className="text-muted text-[0.95rem] leading-relaxed">{t.grammarText}</p>
                </div>

                <div className="feature-tile animate-fade stagger-3">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {t.speaking}
                  </h3>
                  <p className="text-muted text-[0.95rem] leading-relaxed">{t.speakingText}</p>
                </div>

                <div className="feature-tile animate-fade stagger-4">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {t.materials}
                  </h3>
                  <p className="text-muted text-[0.95rem] leading-relaxed">{t.materialsText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
