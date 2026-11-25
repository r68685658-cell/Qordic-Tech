import { ArrowRight } from "lucide-react";

export function SolutionWorkflowPanel({ solution }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
        {solution.kicker}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
        {solution.title}
      </h2>
      <p className="mt-3 max-w-prose leading-relaxed text-muted">
        {solution.description}
      </p>
      <ol
        className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        aria-label={solution.ariaLabel}
      >
        {solution.steps.map((step, index) => (
          <li
            className={`flex min-h-14 items-center gap-3 rounded-xl border p-3 transition-colors ${index === 0 ? "border-violet/40 bg-violet/5" : "border-line bg-page"}`}
            key={step}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-violet/10 text-xs font-extrabold text-violet-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="text-sm text-ink">{step}</strong>
            {index < solution.steps.length - 1 && (
              <ArrowRight
                className="ml-auto hidden shrink-0 text-muted sm:block"
                aria-hidden="true"
                size={15}
              />
            )}
          </li>
        ))}
      </ol>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Solution capabilities">
        {solution.tags.map((tag) => (
          <li
            className="rounded-full bg-violet/10 px-3 py-1.5 text-xs font-bold text-violet-strong"
            key={tag}
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
