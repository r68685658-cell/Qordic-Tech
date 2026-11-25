import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider.jsx";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      {isDark ? (
        <Sun className="theme-toggle-icon" aria-hidden="true" size={18} />
      ) : (
        <Moon className="theme-toggle-icon" aria-hidden="true" size={18} />
      )}
    </button>
  );
}
