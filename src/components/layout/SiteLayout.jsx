import { Link, Outlet, useLocation } from "react-router-dom";
import { pages } from "../../data/pages.js";
import { Container } from "../ui/Container.jsx";
import { Footer } from "./Footer.jsx";
import { AIChatWidget } from "./AIChatWidget.jsx";
import { BrandedCursor } from "./BrandedCursor.jsx";
import { CinematicIntro } from "./CinematicIntro.jsx";
import { MobileQuoteBar } from "./MobileQuoteBar.jsx";
import { Navbar } from "./Navbar.jsx";
import { ScrollToTop } from "./ScrollToTop.jsx";
import { WhatsAppWidget } from "./WhatsAppWidget.jsx";

export function SiteLayout() {
  const { pathname } = useLocation();
  const currentPage = pages.find((page) => page.path === pathname);
  const breadcrumbLabel = currentPage
    ? currentPage.label || currentPage.title.replace(/\s*\|.*$/, "").trim()
    : "";

  return (
    <div className="flex min-h-screen flex-col bg-page text-ink">
      <CinematicIntro />
      <BrandedCursor />
      <a
        className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-ink px-4 py-2 font-semibold text-page focus:not-sr-only focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-focus"
        href="#main"
      >
        Skip to content
      </a>
      <Navbar />
      {currentPage && currentPage.path !== "/" && (
        <nav className="border-b border-line/40 py-2" aria-label="Breadcrumb">
          <Container>
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <li>
                <Link
                  className="rounded-sm transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-ink">
                {breadcrumbLabel}
              </li>
            </ol>
          </Container>
        </nav>
      )}
      <Outlet />
      <Footer />
      <MobileQuoteBar />
      <ScrollToTop />
      <WhatsAppWidget />
      <AIChatWidget />
    </div>
  );
}
