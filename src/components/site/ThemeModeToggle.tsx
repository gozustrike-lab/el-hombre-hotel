"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "el-hombre-theme-mode";

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;
  
  const shell = document.querySelector(".hotel-deluxe-shell") || document.querySelector(".page-shell");
  if (shell) {
    shell.classList.remove("theme-light", "theme-dark");
    shell.classList.add(theme === "light" ? "theme-light" : "theme-dark");
  }
  
  document.documentElement.dataset.themeMode = theme;
  document.body.style.background = theme === "light" ? "#f0f2f5" : "#0A1628";
  document.body.style.color = theme === "light" ? "#111827" : "#f7f5ef";
}

type ThemeModeToggleProps = {
  editorMode?: boolean;
};

export function ThemeModeToggle({ editorMode = false }: ThemeModeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    const initial = stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(initial);
    applyTheme(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [ready, theme]);

  function toggleTheme() {
    setTheme((c) => (c === "light" ? "dark" : "light"));
  }

  return (
    <button
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      className={`theme-toggle-btn${editorMode ? " is-editor" : ""}`}
      onClick={toggleTheme}
      type="button"
    >
      <span className="theme-toggle-track">
        <span className={`theme-toggle-thumb${theme === "dark" ? " is-dark" : ""}`}>
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.9 2.3a9.7 9.7 0 1 0 6.8 16.5A8.7 8.7 0 0 1 14.9 2.3Z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 1.8v3.1M12 19.1v3.1M4.3 4.3l2.2 2.2M17.5 17.5l2.2 2.2M1.8 12h3.1M19.1 12h3.1M4.3 19.7l2.2-2.2M17.5 6.5l2.2-2.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </span>
    </button>
  );
}
