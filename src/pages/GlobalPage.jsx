import { CTASection } from "../components/sections/shared/CTASection.jsx";
import { FeatureGrid } from "../components/sections/shared/FeatureGrid.jsx";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { GlobalCoverage } from "../components/sections/global/GlobalCoverage.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import {
  globalBenefits,
  globalClosing,
  globalCoverage,
  globalPageHero,
  globalSections,
} from "../data/global.js";

export default function GlobalPage() {
  return (
    <main id="main">
      <PageHero {...globalPageHero} />
      <Section as="section" id="global-overview">
        <Container>
          <SectionHeading
            {...globalSections.overview}
          />
          <FeatureGrid items={globalBenefits} columns={3} />
        </Container>
      </Section>
      <Section as="section" className="bg-surface/55">
        <Container>
          <SectionHeading
            {...globalSections.coverage}
            center
          />
          <GlobalCoverage coverage={globalCoverage} />
        </Container>
      </Section>
      <CTASection {...globalClosing} id="global-contact" />
    </main>
  );
}

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`mb-8 max-w-3xl md:mb-10 ${center ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 max-w-prose text-muted">{description}</p>}
    </div>
  );
}
