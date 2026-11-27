import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigationLinks } from "../../data/pages.js";
import { Button } from "../ui/Button.jsx";
import { Container } from "../ui/Container.jsx";
import { useTheme } from "./ThemeProvider.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";

function linkClassName({ isActive }) {
  return [
    "navbar-link inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-surface-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none",
    isActive ? "is-active bg-surface-soft text-ink" : "text-muted",
  ].join(" ");
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector("a")?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  function trapMenuFocus(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableItems = menuRef.current?.querySelectorAll(
      'a[href], button:not([disabled])',
    );
    const firstItem = focusableItems?.[0];
    const lastItem = focusableItems?.[focusableItems.length - 1];

    if (!firstItem || !lastItem) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  }

  const menuVariants = {
    closed: { opacity: 0, y: -8 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b border-line/70 bg-page/80 shadow-[0_10px_40px_rgb(18_45_78/0.04)] backdrop-blur-2xl ${isScrolled ? "is-scrolled" : ""}`}
    >
      <Container className="relative">
        <div className="flex min-h-16 items-center gap-3 lg:min-h-[78px]">
          <Link
            className="site-logo-link inline-flex min-h-11 shrink-0 items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            to="/"
            aria-label="Qordic Technologies home"
            onClick={() => setMenuOpen(false)}
          >
            <img
              className="site-logo"
              src={`/assets/brand/qordic-logo-${theme}.png`}
              alt="Qordic Technologies"
              width="960"
              height="260"
            />
          </Link>

          <nav
            className="ml-auto hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navigationLinks.map((page) => (
              <NavLink
                className={linkClassName}
                key={page.path}
                to={page.path}
                end
              >
                {page.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-3">
            <Button
              className="hidden sm:inline-flex"
              to="/start-project"
              size="small"
            >
              Start a Project
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus lg:hidden motion-reduce:transition-none"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? "mobile-navigation" : undefined}
              onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
              {menuOpen ? (
                <X aria-hidden="true" size={19} />
              ) : (
                <Menu aria-hidden="true" size={19} />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              ref={menuRef}
              id="mobile-navigation"
              className="absolute inset-x-0 top-full z-50 grid gap-2 rounded-b-2xl border border-t-0 border-line bg-surface p-4 shadow-lift lg:hidden"
              role="dialog"
              aria-label="Mobile navigation"
              aria-modal="true"
              initial={shouldReduceMotion ? false : "closed"}
              animate="open"
              exit={shouldReduceMotion ? undefined : "closed"}
              variants={menuVariants}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onKeyDown={trapMenuFocus}
            >
              {navigationLinks.map((page) => (
                <NavLink
                  className={linkClassName}
                  key={page.path}
                  to={page.path}
                  end
                  onClick={closeMenu}
                >
                  {page.label}
                </NavLink>
              ))}
              <Button
                className="mt-2 w-full sm:hidden"
                to="/start-project"
                onClick={closeMenu}
              >
                Start a Project
                <ArrowUpRight aria-hidden="true" size={16} />
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
