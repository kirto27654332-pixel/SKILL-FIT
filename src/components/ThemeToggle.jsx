import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 14.5A8.5 8.5 0 0110.5 4 7 7 0 0021 14.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={t.nav.themeSwitch}
      aria-pressed={!isDark}
      title={isDark ? t.nav.lightMode : t.nav.darkMode}
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun">
        <SunIcon />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon">
        <MoonIcon />
      </span>
      <span className="theme-toggle__slider" data-theme={isDark ? 'dark' : 'light'} aria-hidden />
    </button>
  );
}
