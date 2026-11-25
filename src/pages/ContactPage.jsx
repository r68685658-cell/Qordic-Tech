import { useLocation } from "react-router-dom";
import { ContactFormSection } from "../components/sections/contact/ContactFormSection.jsx";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { contactForm, contactPageHero } from "../data/contact.js";

export default function ContactPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const requestedNeed = query.get("need") ?? "";
  const initialNeed = contactForm.serviceOptions.some(
    (option) => option.value === requestedNeed,
  )
    ? requestedNeed
    : "";
  const initialValues = {
    need: initialNeed,
    subject: query.get("subject") ?? "",
    message: query.get("message") ?? "",
  };

  return (
    <main id="main">
      <PageHero {...contactPageHero} />
      <ContactFormSection
        form={contactForm}
        formKey={search}
        initialValues={initialValues}
      />
    </main>
  );
}
