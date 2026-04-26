"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("site-theme") as Theme | null;

    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function setLightTheme() {
    setTheme("light");
    localStorage.setItem("site-theme", "light");
    document.documentElement.classList.remove("dark");
  }

  function setDarkTheme() {
    setTheme("dark");
    localStorage.setItem("site-theme", "dark");
    document.documentElement.classList.add("dark");
  }

  return (
    <div className="segment dark:border-border/80" role="group" aria-label="Theme">
      <button
        type="button"
        data-active={theme === "light"}
        onClick={setLightTheme}
        aria-pressed={theme === "light"}
      >
        Light
      </button>

      <button
        type="button"
        data-active={theme === "dark"}
        onClick={setDarkTheme}
        aria-pressed={theme === "dark"}
      >
        Dark
      </button>
    </div>
  );
}
