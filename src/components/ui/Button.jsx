import { Link } from "react-router-dom";

const variants = {
  primary:
    "border-transparent bg-brand-gradient text-white shadow-card hover:-translate-y-0.5 hover:shadow-lift",
  secondary:
    "border-line bg-surface text-ink hover:border-violet hover:bg-surface-soft",
  quiet:
    "border-transparent bg-transparent text-ink hover:bg-surface-soft",
};

const sizes = {
  default: "min-h-11 px-5 py-2.5 text-sm",
  small: "min-h-11 px-4 py-2 text-sm",
};

export function Button({
  to,
  href,
  variant = "primary",
  size = "default",
  className = "",
  type = "button",
  children,
  ...props
}) {
  const classes = [
    "premium-button inline-flex items-center justify-center gap-2 rounded-full border font-bold leading-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none motion-reduce:transition-none",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        <span className="button-content">{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        <span className="button-content">{children}</span>
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      <span className="button-content">{children}</span>
    </button>
  );
}
