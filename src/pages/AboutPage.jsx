import { CTASection } from "../components/sections/shared/CTASection.jsx";
import { FeatureGrid } from "../components/sections/shared/FeatureGrid.jsx";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { Reveal } from "../components/sections/shared/Reveal.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import {
  aboutPageHero,
  aboutSections,
  companyStory,
  companyValues,
  teamMembers,
} from "../data/about.js";

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero {...aboutPageHero} />
      <Section as="section" id="company-story">
        <Container>
          <Reveal>
            <div className="max-w-3xl rounded-panel border border-amber/40 bg-amber/10 p-6 sm:p-8">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
                {companyStory.eyebrow}
              </p>
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                {companyStory.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {companyStory.description}
              </p>
            </div>
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
      <Section as="section" id="team">
        <Container>
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
              {aboutSections.team.eyebrow}
            </p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {aboutSections.team.title}{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {aboutSections.team.accent}
              </span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {teamMembers.map((person, index) => (
              <Reveal key={index}>
                <Card className="flex items-center gap-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-xl font-extrabold text-white"
                    aria-hidden="true"
                  >
                    Q
                  </span>
                  <span>
                    <strong className="block text-base font-bold text-ink">
                      {person.name}
                    </strong>
                    <span className="mt-1 block text-sm text-muted">
                      {person.role}
                    </span>
                  </span>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button to="/start-project">{aboutSections.team.action}</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
