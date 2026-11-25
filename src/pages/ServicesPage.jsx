import { CTASection } from "../components/sections/shared/CTASection.jsx";
import { FeatureGrid } from "../components/sections/shared/FeatureGrid.jsx";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { ServiceDetailsSection } from "../components/sections/services/ServiceDetailsSection.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import {
  serviceAreas,
  serviceDetails,
  servicesFinalCta,
  servicesLeadForm,
  servicesPageHero,
  servicesSectionContent,
} from "../data/services.js";

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero {...servicesPageHero} />
      <Section as="section" className="bg-surface/55" id="service-list">
        <Container>
          <SectionHeading
            {...servicesSectionContent.listHeading}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceAreas.map((service) => (
              <article
                className="scroll-mt-28"
                id={service.id}
                key={service.id}
              >
                <FeatureGrid
                  items={[
                    {
                      icon: service.icon,
                      title: service.title,
                      description: service.description,
                      link: {
                        label: servicesSectionContent.detailsLinkLabel,
                        to: `#${service.href}`,
                      },
                    },
                  ]}
                  columns={1}
                  linked
                />
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button to="/start-project">{servicesSectionContent.listAction}</Button>
          </div>
        </Container>
      </Section>

      {serviceDetails.map((service, index) => (
        <ServiceDetailsSection
          index={index}
          key={service.id}
          service={service}
        />
      ))}

      <CTASection
        {...servicesFinalCta}
        form={servicesLeadForm}
        id="services-contact"
      />
    </main>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-3xl md:mb-10">
      <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-prose text-muted">{description}</p>
    </div>
  );
}
