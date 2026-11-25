import { Link } from "react-router-dom";

export function FooterLinkGroup({ title, links }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-bold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-violet-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none"
              to={link.to}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
