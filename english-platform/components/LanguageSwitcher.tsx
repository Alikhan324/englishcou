"use client";

import { useEffect, useState } from "react";

type Language = "kz" | "ru" | "en";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("kz");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");

    if (
      savedLanguage === "kz" ||
      savedLanguage === "ru" ||
      savedLanguage === "en"
    ) {
      setLanguage(savedLanguage);
    }
  }, []);

  function changeLanguage(newLanguage: Language) {
    setLanguage(newLanguage);
    localStorage.setItem("site-language", newLanguage);
    window.location.reload();
  }

  return (
    <div
      className="segment dark:border-border/80"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        data-active={language === "kz"}
        onClick={() => changeLanguage("kz")}
      >
        KZ
      </button>

      <button
        type="button"
        data-active={language === "ru"}
        onClick={() => changeLanguage("ru")}
      >
        RU
      </button>

      <button
        type="button"
        data-active={language === "en"}
        onClick={() => changeLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}