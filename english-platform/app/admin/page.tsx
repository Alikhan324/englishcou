"use client";

import { translations } from "@/data/translations";
import { useEffect, useState } from "react";

type Language = "kz" | "ru" | "en";

export default function AdminPage() {
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;
    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-900">{t.adminPanel}</h1>

        <p className="mt-2 text-gray-600">
          {t.adminText}
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">{t.lessons}</h2>
            <p className="text-sm text-gray-500">{t.lessonsManage}</p>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">{t.users}</h2>
            <p className="text-sm text-gray-500">{t.usersText}</p>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">{t.statistics}</h2>
            <p className="text-sm text-gray-500">{t.statisticsText}</p>
          </div>
        </div>
      </div>
    </main>
  );
}