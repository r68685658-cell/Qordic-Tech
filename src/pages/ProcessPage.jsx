import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { StepsTimeline } from "../components/sections/shared/StepsTimeline.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import {
  processPageHero,
  processSectionContent,
  processStages,
} from "../data/process.js";

export default function ProcessPage() {
  return (
    <main id="main">
      <PageHero {...processPageHero} />
      <Section as="section" id="process-grid">
        <Container>
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
              {processSectionContent.eyebrow}
            </p>
            <h2
              className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
              id="process-title"
            >
              {processSectionContent.title}{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {processSectionContent.accent}
              </span>
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-muted">
              {processSectionContent.description}
            </p>
          </div>
          <StepsTimeline items={processStages} />
          <div className="mt-8 flex justify-center">
            <Button to="/start-project">{processSectionContent.action}</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
