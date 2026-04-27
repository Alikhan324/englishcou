"use client";

import { translations } from "@/data/translations";
import Link from "next/link";
import { useEffect, useState } from "react";

type Language = "kz" | "ru" | "en";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;
    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  function login() {
    const savedUser = localStorage.getItem("registered-user");

    if (!savedUser) {
      alert(t.userNotFound);
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email !== email || user.password !== password) {
      alert(t.incorrectCredentials);
      return;
    }

    localStorage.setItem(
      "auth-user",
      JSON.stringify({
        name: user.name,
        email: user.email,
        isPremium: user.isPremium,
      })
    );

    window.location.href = "/profile";
  }

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-md px-6 py-16 md:py-20">
        <div className="card-elevated rounded-[1.35rem] p-8 md:p-10">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground mb-2">
            {t.login}
          </h1>

          <p className="text-muted mb-8 leading-relaxed">
            {t.loginText}
          </p>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">{t.email}</label>

              <input
                type="email"
                placeholder="student@gmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">{t.password}</label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="input-field"
              />
            </div>

            <button type="button" onClick={login} className="btn-primary w-full rounded-xl py-3 text-sm">
              {t.signIn}
            </button>
          </form>

          <p className="mt-6 text-sm text-muted">
            {t.noAccount}{" "}
            <Link href="/register" className="font-semibold text-accent transition-colors hover:text-accent-hover">
              {t.register}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
