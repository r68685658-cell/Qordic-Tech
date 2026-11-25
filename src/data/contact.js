import { servicesLeadForm } from "./services.js";

export const contactPageHero = {
  eyebrow: "Start with a conversation",
  title: "Which part of your business",
  accent: "needs a better way?",
  description:
    "Share what you’re trying to improve. We’ll help identify the right service, clarify the scope and discuss what a quote would involve.",
  scrollTarget: { id: "contact-form", label: "Tell us what you need" },
};

export const contactForm = {
  ...servicesLeadForm,
  title: "Tell us what you need",
  description: "We’ll follow up about your enquiry.",
  subjectLabel: "Subject",
  messageLabel: "How can we help?",
  messagePlaceholder: "Share a little about what you’re looking to improve.",
};

export const contactSectionContent = {
  eyebrow: "Your enquiry",
  title: "A useful first step, without guesswork.",
  description:
    "Tell us which area you’re considering and what you hope to improve. Your inquiry is sent through the configured EmailJS service.",
};
