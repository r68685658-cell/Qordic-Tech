import { Accordion } from "../components/sections/shared/Accordion.jsx";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import {
  faqPageHero,
  faqSectionContent,
  frequentlyAskedQuestions,
} from "../data/faq.js";

export default function FaqPage() {
  return (
    <main id="main">
      <PageHero {...faqPageHero} />
      <Section as="section" id="faq-list">
        <Container className="max-w-content">
          <div className="mb-9 text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
              {faqSectionContent.eyebrow}
            </p>
            <h2
              className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl"
              id="faq-title"
            >
              {faqSectionContent.title}{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {faqSectionContent.accent}
              </span>
            </h2>
          </div>
          <Accordion items={frequentlyAskedQuestions} defaultOpen={0} />
          <div className="mt-8 flex justify-center">
            <Button to="/contact">{faqSectionContent.action}</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
