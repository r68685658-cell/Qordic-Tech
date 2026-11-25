import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FeatureGrid } from "../shared/FeatureGrid.jsx";
import { Reveal } from "../shared/Reveal.jsx";
import { Button } from "../../ui/Button.jsx";
import { Container } from "../../ui/Container.jsx";
import { Section } from "../../ui/Section.jsx";

export function ServiceDetailsSection({ service, index }) {
  return (
    <Section
      as="section"
      className={index % 2 === 1 ? "bg-surface/55" : ""}
      id={service.id}
      aria-labelledby={`${service.id}-title`}
    >
      <Container>
        <Reveal>
          <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.12em] text-violet-strong">
                {service.number} · {service.kicker}
              </p>
              <h2
                className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl"
                id={`${service.id}-title`}
              >
                {service.title}{" "}
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {service.accent}
                </span>
              </h2>
              <p className="mt-4 max-w-prose leading-relaxed text-muted">
                {service.description}
              </p>
            </div>
            <Button to={`/start-project?service=${encodeURIComponent(service.need)}`} variant="secondary">
              {service.inquiry}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.04}>
          <figure className="service-image-frame mb-8">
            <img
              alt={service.imageAlt}
              className="service-image"
              decoding="async"
              height="800"
              loading="lazy"
              sizes="(max-width: 819px) 100vw, 1180px"
              src={service.image}
              width="1200"
            />
            <span className="service-image-label" aria-hidden="true">
              {service.number} / {service.kicker}
            </span>
          </figure>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="service-approach-grid">
            <article>
              <span>01 · THE CHALLENGE</span>
              <h3>What this service can address</h3>
              <p>{service.problem}</p>
            </article>
            <article>
              <span>02 · OUR APPROACH</span>
              <h3>Start with your requirements</h3>
              <p>{service.approach}</p>
            </article>
          </div>
        </Reveal>
        <div className="service-capabilities-heading">
          <h3>Capabilities to consider</h3>
          <p>Features and delivery choices are confirmed together as the project scope is defined.</p>
        </div>
        <FeatureGrid items={service.features} columns={3} />
        <div className="service-technology-note">
          <span>Technology choices</span>
          <p>Platforms, integrations and implementation details depend on your project requirements; we do not assume a fixed stack.</p>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-bold text-violet-strong transition-colors hover:bg-violet/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            to={`/start-project?service=${encodeURIComponent(service.need)}`}
          >
            {service.estimate}
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <p className="service-concept-note">
          Looking for examples? Our homepage includes clearly labeled concept experiences, not client case studies.
          <Link to="/#selected-work"> View concept experiences <ArrowUpRight aria-hidden="true" size={14} /></Link>
        </p>
      </Container>
    </Section>
  );
}
