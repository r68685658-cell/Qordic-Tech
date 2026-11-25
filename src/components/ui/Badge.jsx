export function Badge({ className = "", children, ...props }) {
  return (
    <span
      className={`inline-flex min-h-7 items-center gap-2 rounded-full border border-violet/15 bg-violet/10 px-3 py-1 text-xs font-bold tracking-wide text-violet-strong ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
