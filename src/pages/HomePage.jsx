import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Accordion } from "../components/sections/shared/Accordion.jsx";
import { CTASection } from "../components/sections/shared/CTASection.jsx";
import { FeatureGrid } from "../components/sections/shared/FeatureGrid.jsx";
import { Marquee } from "../components/sections/shared/Marquee.jsx";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { Reveal } from "../components/sections/shared/Reveal.jsx";
import { WorkflowPreview } from "../components/sections/home/WorkflowPreview.jsx";
import {
  ConceptExperiences,
  PremiumProjectCTA,
  SoftwareDemo,
  TechnologyEcosystem,
  TechnologyUniverse,
  VisionTimeline,
  WhyQordic,
} from "../components/sections/home/PremiumHomeExperience.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import {
  capabilityItems,
  challengeFeatures,
  engagementModels,
  homeFaqs,
  homeLeadForm,
  homePageHero,
  homeSections,
  homeWorkflow,
  supportedIndustries,
} from "../data/home.js";

export default function HomePage() {
  return (
    <main id="main">
      <PageHero {...homePageHero} />

      <section
        className="trust-strip border-y border-line py-8"
        id="trust"
        aria-label={homeSections.trust.ariaLabel}
      >
        <Container>
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/70">
              Connected capabilities
            </p>
            <p className="max-w-2xl text-lg font-bold text-white sm:text-xl">
              One team for software, operations and ongoing support.
            </p>
          </div>
        </Container>
        <div className="mt-7">
          <Marquee items={capabilityItems} label={homeSections.trust.marqueeLabel} />
        </div>
        <div className="mt-5 flex justify-center px-4">
          <Button to="/start-project" size="small" variant="secondary">
            {homeSections.trust.buttonLabel}
            <ArrowUpRight aria-hidden="true" size={16} />
          </Button>
        </div>
      </section>

      <Section as="section">
        <Container>
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
              {homeSections.challenges.eyebrow}
            </p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {homeSections.challenges.title}{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {homeSections.challenges.accent}
              </span>
            </h2>
            <p className="mt-4 max-w-prose text-muted">
              {homeSections.challenges.description}
            </p>
          </div>
          <FeatureGrid items={challengeFeatures} columns={3} />
          <div className="mt-8 flex justify-center">
            <Button to="/start-project" variant="secondary">
              {homeSections.challenges.buttonLabel}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/55 phase8-ambient" id="technology-universe">
        <Container>
          <SectionTitle
            eyebrow="Our technology universe"
            title="Explore Our Technology Universe"
            description="Discover the technologies and digital capabilities that power modern businesses."
          />
          <TechnologyUniverse />
          <div className="mt-8 flex justify-center">
            <Button to="/start-project">{homeSections.services.buttonLabel}</Button>
          </div>
        </Container>
      </Section>

      <Section id="industry-workflows">
        <Container>
          <SectionTitle
            {...homeSections.workflows}
          />
          <WorkflowPreview workflow={homeWorkflow} />
          <div className="mt-8 flex justify-center">
            <Button to="/start-project" variant="secondary">
              {homeSections.workflows.buttonLabel}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/55 phase8-ambient" id="selected-work">
        <Container>
          <SectionTitle
            eyebrow="Selected work"
            title="Selected Work & Digital Experiences"
            description="These are illustrative concept experiences, not completed client projects or customer results."
          />
          <ConceptExperiences />
        </Container>
      </Section>

      <Section className="phase8-ambient" id="digital-demo">
        <Container>
          <SectionTitle
            eyebrow="Try an interface concept"
            title="Experience Digital Solutions"
            description="Explore a small interactive workspace concept. All names, activity and counts below are sample demo data."
          />
          <SoftwareDemo />
        </Container>
      </Section>

      <Section className="bg-surface/55 phase8-ambient" id="why-qordic">
        <Container>
          <SectionTitle
            eyebrow="A practical partner"
            title="Why Businesses Choose QORDIC"
            description="A clear scope, thoughtful communication and support planned around your business needs."
          />
          <WhyQordic />
          <div className="mt-8 flex justify-center">
            <Button to="/start-project">Discuss a project</Button>
          </div>
        </Container>
      </Section>

      <Section className="phase8-ambient" id="process-preview">
        <Container>
          <SectionTitle
            eyebrow="How we build"
            title="From Vision to Reality"
            description="Every successful digital product starts with a clear process."
          />
          <VisionTimeline />
          <div className="mt-8 flex justify-center">
            <Button to="/start-project" variant="secondary">
              {homeSections.process.buttonLabel}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface/55 phase8-ambient" id="technology-ecosystem">
        <Container>
          <SectionTitle
            eyebrow="A flexible technology ecosystem"
            title="Technologies Behind Our Work"
            description="Explore the capability areas that can come together in a project. The right tools depend on your requirements."
          />
          <TechnologyEcosystem />
        </Container>
      </Section>

      <Section className="bg-surface/55">
        <Container>
          <SectionTitle
            {...homeSections.engagement}
            center
          />
          <FeatureGrid items={engagementModels} columns={3} linked />
          <div className="mt-8 flex justify-center">
            <Button to="/start-project" variant="secondary">
              {homeSections.engagement.buttonLabel}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
          </div>
        </Container>
      </Section>

      <Section id="industries">
        <Container>
          <SectionTitle
            {...homeSections.industries}
          />
          <FeatureGrid items={supportedIndustries} columns={3} />
          <div className="mt-8 flex justify-center">
            <Button to="/start-project">{homeSections.industries.buttonLabel}</Button>
          </div>
        </Container>
      </Section>

      <Section id="faq-preview">
        <Container className="max-w-content">
          <SectionTitle
            {...homeSections.faq}
            center
          />
          <Accordion items={homeFaqs} defaultOpen={-1} />
          <div className="mt-7 flex justify-center">
            <Button to="/faq" variant="secondary">{homeSections.faq.buttonLabel}</Button>
          </div>
        </Container>
      </Section>

      <CTASection
        {...homeSections.finalCta}
        id="home-contact"
        form={homeLeadForm}
      />
      <PremiumProjectCTA />
    </main>
  );
}

function SectionTitle({ eyebrow, title, description, sectionAction, center = false }) {
  return (
    <Reveal className={`mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between ${center ? "mx-auto text-center" : ""}`}>
      <div className={center ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">{description}</p>}
      </div>
      {sectionAction && (
        <Link
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-violet focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          to={sectionAction.to}
        >
          {sectionAction.label}
          <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      )}
    </Reveal>
  );
}
