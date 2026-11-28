import { Link } from "react-router-dom";
import { companyLinks, exploreLinks } from "../../data/pages.js";
import { Container } from "../ui/Container.jsx";
import { useTheme } from "./ThemeProvider.jsx";
import { FooterLinkGroup } from "./FooterLinkGroup.jsx";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/80 pb-20 pt-14 sm:pb-12">
      <div className="footer-orbit pointer-events-none absolute -right-28 -top-28 size-80 rounded-full" aria-hidden="true" />
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link
              className="site-logo-link inline-flex min-h-11 items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              to="/"
              aria-label="Qordic Technologies home"
            >
              <img
                className="site-logo"
                src={`/assets/brand/qordic-logo-${theme}.png`}
                alt="Qordic Technologies"
                width="960"
                height="260"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Qordic Tech (Qordic Technologies) offers software and business
              support shaped around the way your organization works.
            </p>
          </div>

          <FooterLinkGroup title="Explore" links={exploreLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />

          <div>
            <h2 className="text-sm font-bold text-ink">Contact</h2>
            <p className="mt-4 text-sm text-muted">Have a project in mind?</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link className="font-semibold text-ink hover:text-violet-strong" to="/contact">Contact Qordic Tech</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Qordic Technologies. All rights reserved.</p>
          <p>Built around your business.</p>
        </div>
      </Container>
    </footer>
  );
}
