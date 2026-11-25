import { ChevronDown } from "lucide-react";
import { Card } from "../../ui/Card.jsx";

export function Accordion({ items, defaultOpen = 0, className = "" }) {
  return (
    <div className={`grid gap-3 ${className}`}>
      {items.map((item, index) => (
        <details
          className="group rounded-card border border-line bg-surface px-5 shadow-card open:border-violet/40 sm:px-6"
          key={item.question}
          open={index === defaultOpen}
        >
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-bold text-ink marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDown
              aria-hidden="true"
              className="shrink-0 text-violet-strong transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              size={19}
            />
          </summary>
          <div className="max-w-prose border-t border-line pb-5 pt-4 text-sm leading-relaxed text-muted sm:text-base">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
