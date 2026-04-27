"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { translations } from "@/data/translations";

type Language = "kz" | "ru" | "en";

type User = {
  name: string;
  email: string;
  isPremium: boolean;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language") as Language | null;
    if (savedLanguage === "kz" || savedLanguage === "ru" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  const publicLinks = [
    { href: "/", label: t.home },
    { href: "/courses", label: t.courses },
    { href: "/search", label: t.search },
    { href: "/pricing", label: t.pricing },
  ];

  useEffect(() => {
    function loadUser() {
      try {
        const savedUser = localStorage.getItem("auth-user");
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        localStorage.removeItem("auth-user");
        setUser(null);
      }
    }

    loadUser();
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 6);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function logout() {
    localStorage.removeItem("auth-user");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <header
      data-scrolled={scrolled}
      className="nav-shell sticky top-0 z-50 border-b border-border/80 bg-card/75 backdrop-blur-md dark:bg-card/70"
    >
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 ease-out hover:text-accent"
        >
          Fazyl<span className="text-accent">Academy</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 text-sm font-medium text-foreground/90">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link rounded-lg px-2 py-1"
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <>
              <Link
                href="/dashboard"
                className="nav-link rounded-lg px-2 py-1"
              >
                {t.dashboard}
              </Link>

              <Link
                href="/certificate"
                className="nav-link rounded-lg px-2 py-1"
              >
                {t.certificate}
              </Link>
            </>
          )}

          <div className="ml-1 flex items-center gap-2 border-l border-border/70 pl-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {user ? (
            <div className="flex items-center gap-2 pl-2">
              <Link
                href="/profile"
                className="btn-primary rounded-xl px-5 py-2 text-sm"
              >
                {t.profile}
              </Link>

              <button
                type="button"
                onClick={logout}
                className="rounded-xl border border-border bg-accent-soft/80 px-4 py-2 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:border-accent/40 hover:bg-accent-soft"
              >
                {t.logout}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="btn-primary ml-1 rounded-xl px-5 py-2 text-sm"
            >
              {t.login}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}