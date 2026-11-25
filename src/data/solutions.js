export const solutionsPageHero = {
  eyebrow: "Solutions built for work",
  title: "Industry-ready systems,",
  accent: "shaped around your workflow.",
  description:
    "Every industry has different needs. We’ll work from your business rules, user journeys and operating constraints to define the right solution.",
  primaryAction: { label: "Book a Consultation", to: "/start-project" },
  secondaryAction: { label: "Explore Solutions", href: "#solution-panels" },
};

export const solutionWorkflows = [
  {
    id: "real-estate",
    label: "Real Estate",
    kicker: "Real Estate",
    title: "Real Estate Platform",
    description:
      "Support property sales, customer journeys, payment processes and handover workflows with one connected system.",
    ariaLabel: "Real estate workflow",
    steps: ["Lead", "Site Visit", "Booking", "Installments", "Construction", "Handover"],
    tags: ["CRM", "Inventory", "Payments", "Customer portal"],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    kicker: "Healthcare",
    title: "Healthcare Systems",
    description:
      "Support patient journeys, appointments, consultation and billing with a secure, simpler experience.",
    ariaLabel: "Healthcare workflow",
    steps: ["Appointment", "Check-in", "Consultation", "Lab/Pharmacy", "Billing", "Follow-up"],
    tags: ["Scheduling", "EMR", "Billing", "Telemedicine"],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    kicker: "E-commerce",
    title: "E-commerce & Retail",
    description:
      "Align storefronts and back-office operations so customers get a smoother journey and teams can act faster.",
    ariaLabel: "E-commerce workflow",
    steps: ["Browse", "Cart", "Payment", "Fulfilment", "Delivery", "Support"],
    tags: ["Storefront", "POS", "Inventory", "Analytics"],
  },
  {
    id: "ai-agents",
    label: "AI Agents",
    kicker: "AI Agents",
    title: "AI Chatbot Agents",
    description:
      "Design conversational agents for common questions and daily business interactions with clear escalation rules.",
    ariaLabel: "AI agent workflow",
    steps: ["Question", "Understand", "Search Knowledge", "Answer", "Hand off", "Learn"],
    tags: ["WhatsApp", "Website", "CRM sync", "Multi-language"],
  },
];
