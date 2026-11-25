import { ArrowUpRight } from "lucide-react";
import { Button } from "../../ui/Button.jsx";
import { Container } from "../../ui/Container.jsx";
import { LeadForm } from "./LeadForm.jsx";
import { Reveal } from "./Reveal.jsx";

export function CTASection({
  eyebrow,
  title,
  description,
  action,
  form,
  id,
  className = "",
}) {
  return (
    <section
      className={`relative isolate overflow-hidden py-16 sm:py-20 lg:py-24 ${className}`}
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="cta-backdrop absolute inset-0 -z-10 bg-gradient-to-br from-violet to-[#5638bf]" />
      <div className="cta-orb absolute -right-24 -top-28 -z-10 size-80 rounded-full bg-coral/40 blur-3xl" />
      <Container className={form ? "grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16" : ""}>
        <Reveal className="max-w-3xl">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-white/80">
            {eyebrow}
          </p>
          <h2 id={id ? `${id}-title` : undefined} className="max-w-[22ch] text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-white/85 sm:text-lg">
            {description}
          </p>
          {action && (
            <Button className="mt-7" to={action.to} variant="secondary">
              {action.label}
              <ArrowUpRight aria-hidden="true" size={17} />
            </Button>
          )}
        </Reveal>
        {form && <LeadForm {...form} />}
      </Container>
    </section>
  );
}
