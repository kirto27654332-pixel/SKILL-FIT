import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import LanguageToggle from './LanguageToggle';
import NavbarSocial from './NavbarSocial';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { href: '#accueil', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#planning', label: t.nav.planning },
    { href: '#tarifs', label: t.nav.pricing },
    { href: '#localisation', label: t.nav.location },
    { href: '#contact', label: t.nav.contact },
  ];

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled || menuOpen ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__inner container">
        <Logo size="sm" />

        {menuOpen && (
          <button
            type="button"
            className="navbar__backdrop"
            onClick={closeMenu}
            aria-label={t.nav.closeMenu}
          />
        )}

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          <div className="navbar__nav-links">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__nav-mobile">
            <NavbarSocial className="navbar-social--mobile" />
            <a href="#contact" className="btn btn-primary navbar__cta-mobile" onClick={closeMenu}>
              {t.nav.join}
            </a>
            <div className="navbar__mobile-toggles">
              <ThemeToggle className="theme-toggle--mobile" />
              <LanguageToggle className="lang-toggle--mobile navbar__lang-mobile" />
            </div>
          </div>
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />
          <NavbarSocial className="navbar-social--desktop" />
          <LanguageToggle className="navbar__lang" />
          <a href="#contact" className="btn btn-primary navbar__cta">
            {t.nav.join}
          </a>
        </div>

        <button
          type="button"
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.menu}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
