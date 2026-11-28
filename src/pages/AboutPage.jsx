import { CTASection } from "../components/sections/shared/CTASection.jsx";
import { FeatureGrid } from "../components/sections/shared/FeatureGrid.jsx";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { Reveal } from "../components/sections/shared/Reveal.jsx";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import { serviceAreas } from "../data/services.js";
import {
  aboutPageHero,
  aboutSections,
  companyStory,
  companyValues,
} from "../data/about.js";
import { businessInfo } from "../data/business.js";

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero {...aboutPageHero} />
      <Section as="section" id="company-story">
        <Container className="grid min-w-0 grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
          <div className="min-w-0">
            <div className="h-full rounded-panel border border-violet/35 bg-violet/10 p-6 sm:p-8">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
                {companyStory.eyebrow}
              </p>
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                {companyStory.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {businessInfo.description}
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                {companyStory.description}
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                To discuss a requirement, visit our contact page or start a project inquiry.
              </p>
              <nav className="mt-5" aria-label="Qordic Technologies service details">
                <p className="mb-2 text-sm font-bold text-ink">Explore service details:</p>
                <ul className="flex flex-wrap gap-2">
                  {serviceAreas.map((service) => (
                    <li key={service.id}>
                      <Link
                        className="inline-flex rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-violet hover:text-violet-strong"
                        to={`/services#${service.href}`}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/contact" variant="secondary">Contact Qordic Tech</Button>
                <Button to="/services" variant="secondary">View all services</Button>
              </div>
            </div>
          </div>
          <Reveal className="min-w-0" delay={0.08}>
            <figure className="service-image-frame about-story-image w-full min-w-0">
              <img
                className="service-image"
                src="/assets/company/about-collaboration.webp"
                alt="People collaborating around a laptop in a professional workspace."
                width="1400"
                height="900"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="about-story-caption">
                Practical technology, shaped around people and their work
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>
      <Section as="section" className="bg-surface/55" id="company-values">
        <Container>
          <div className="mb-9 text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
              {aboutSections.values.eyebrow}
            </p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {aboutSections.values.title}{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {aboutSections.values.accent}
              </span>
            </h2>
          </div>
          <FeatureGrid items={companyValues} columns={4} />
        </Container>
      </Section>
      <Section as="section" id="contact-company">
        <Container>
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
              {aboutSections.contact.eyebrow}
            </p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {aboutSections.contact.title}{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {aboutSections.contact.accent}
              </span>
            </h2>
          </div>
          <p className="max-w-prose text-muted">
            Contact us to discuss your business needs, service options and project scope.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/start-project">{aboutSections.contact.action}</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
