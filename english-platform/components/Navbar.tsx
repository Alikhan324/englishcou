"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

type User = {
  name: string;
  email: string;
  isPremium: boolean;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function loadUser() {
      const savedUser = localStorage.getItem("auth-user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
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
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-4">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 ease-out hover:text-accent"
        >
          Fazyl<span className="text-accent">Academy</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-1 gap-y-2 text-sm font-medium text-foreground/90">
          <Link href="/" className="nav-link px-2 py-1 rounded-lg">
            Home
          </Link>

          <Link href="/courses" className="nav-link px-2 py-1 rounded-lg">
            Courses
          </Link>

          <Link href="/search" className="nav-link px-2 py-1 rounded-lg">
            Search
          </Link>

          {user && (
            <Link href="/dashboard" className="nav-link px-2 py-1 rounded-lg">
              Dashboard
            </Link>
          )}

          <Link href="/pricing" className="nav-link px-2 py-1 rounded-lg">
            Pricing
          </Link>

          {user && (
            <Link href="/certificate" className="nav-link px-2 py-1 rounded-lg">
              Certificate
            </Link>
          )}

          <Link href="/admin" className="nav-link px-2 py-1 rounded-lg">
            Admin
          </Link>

          <div className="flex items-center gap-2 pl-1 border-l border-border/70 ml-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {user ? (
            <div className="flex items-center gap-2 pl-2">
              <Link
                href="/profile"
                className="btn-primary px-5 py-2 rounded-xl text-sm"
              >
                Profile
              </Link>

              <button
                type="button"
                onClick={logout}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground bg-accent-soft/80 border border-border hover:border-accent/40 transition-all duration-300 ease-out hover:bg-accent-soft"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn-primary px-5 py-2 rounded-xl text-sm ml-1">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
