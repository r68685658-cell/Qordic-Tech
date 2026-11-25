import { Check } from "lucide-react";
import { Card } from "../../ui/Card.jsx";
import { Reveal } from "./Reveal.jsx";

export function StepsTimeline({ items, id, className = "" }) {
  return (
    <ol
      id={id}
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-5 ${className}`}
      aria-label="Project stages"
    >
      {items.map((item, index) => (
        <Reveal key={item.title} delay={index * 0.04}>
          <Card className="relative h-full overflow-hidden p-5" interactive>
            <span className="mb-5 flex size-11 items-center justify-center rounded-full bg-brand-gradient text-sm font-extrabold text-white">
              {item.number ?? String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            {item.done && (
              <span className="absolute right-4 top-4 text-violet-strong">
                <Check aria-label="Complete" size={17} />
              </span>
            )}
          </Card>
        </Reveal>
      ))}
    </ol>
  );
}
