"use client";

import { translations } from "@/data/translations";
import { useEffect, useState } from "react";

type Language = "kz" | "ru" | "en";

export default function PricingPage() {
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;
    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="mb-12 text-center">
          <p className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {t.premium}
          </p>

          <h1 className="font-display mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl mb-4">
            {t.pricingTitle}
          </h1>

          <p className="mx-auto max-w-xl text-muted text-lg leading-relaxed">
            {t.pricingText}
          </p>
        </div>

        <div className="card-elevated mx-auto max-w-md rounded-3xl p-8 md:p-10">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">{t.premium} Plan</h2>

          <p className="text-muted mb-6 leading-relaxed">{t.heroText}</p>

          <div className="mb-6 font-display text-4xl font-semibold tracking-tight text-foreground">
            1990 ₸
            <span className="text-base font-normal text-muted"> {t.perMonth}</span>
          </div>

          <ul className="mb-8 space-y-3 text-foreground/90">
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              {t.materials}
            </li>
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              {t.speaking}
            </li>
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              {t.grammar}
            </li>
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              {t.progress}
            </li>
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              {t.certificate}
            </li>
          </ul>

          <button type="button" className="btn-primary w-full rounded-xl py-3 text-sm">
            {t.getStarted}
          </button>

          <p className="mt-4 text-center text-sm text-muted">
            {t.heroText}
          </p>
        </div>
      </section>
    </main>
  );
}
