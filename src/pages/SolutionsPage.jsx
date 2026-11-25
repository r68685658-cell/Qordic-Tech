import { ArrowUpRight } from "lucide-react";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { Reveal } from "../components/sections/shared/Reveal.jsx";
import { TabsPanel } from "../components/sections/shared/TabsPanel.jsx";
import { SolutionWorkflowPanel } from "../components/sections/solutions/SolutionWorkflowPanel.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import { solutionWorkflows, solutionsPageHero } from "../data/solutions.js";

export default function SolutionsPage() {
  return (
    <main id="main">
      <PageHero {...solutionsPageHero} />
      <Section as="section" id="solution-panels">
        <Container>
          <Reveal>
            <TabsPanel
              initialTab="real-estate"
              items={solutionWorkflows.map((solution) => ({
                id: solution.id,
                label: solution.label,
                content: <SolutionWorkflowPanel solution={solution} />,
              }))}
              label="Solution categories"
              syncHash
            />
          </Reveal>
          <div className="mt-8 flex justify-center">
            <Button to="/start-project">
              Tell us which solution fits best
              <ArrowUpRight aria-hidden="true" size={16} />
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
