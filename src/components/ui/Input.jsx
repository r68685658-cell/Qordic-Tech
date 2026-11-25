export function Input({
  id,
  label,
  error,
  description,
  className = "",
  ...inputProps
}) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-ink" htmlFor={id}>
        {label}
      </label>
      <input
        className={`min-h-11 w-full rounded-xl border border-line bg-page px-3.5 py-2.5 text-base text-ink placeholder:text-muted/80 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {description && (
        <p className="text-sm text-muted" id={descriptionId}>
          {description}
        </p>
      )}
      {error && (
        <p className="text-sm font-medium text-danger" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
