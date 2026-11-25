import { LeadForm } from "../shared/LeadForm.jsx";
import { Container } from "../../ui/Container.jsx";
import { contactSectionContent } from "../../../data/contact.js";

export function ContactFormSection({ form, initialValues, formKey }) {
  return (
    <section
      className="bg-surface/55 py-16 sm:py-20 lg:py-28"
      id="contact-form"
      aria-labelledby="contact-section-title"
    >
      <Container className="grid items-start gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
            {contactSectionContent.eyebrow}
          </p>
          <h2
            className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl"
            id="contact-section-title"
          >
            {contactSectionContent.title}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-muted">
            {contactSectionContent.description}
          </p>
        </div>
        <LeadForm
          {...form}
          className="w-full"
          initialValues={initialValues}
          key={formKey}
        />
      </Container>
    </section>
  );
}
