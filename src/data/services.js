export const servicesPageHero = {
  eyebrow: "Services built around your needs",
  title: "The people and technology to",
  accent: "move work forward.",
  description:
    "From a focused software project to ongoing operational support, bring us the challenge. We’ll work with you to define the right scope and next step.",
  primaryAction: { label: "Book a Consultation", to: "/start-project" },
  secondaryAction: { label: "Explore Services", href: "#service-list" },
  note:
    "Project scope, delivery approach and pricing are discussed with you before work begins.",
};

export const serviceAreas = [
  {
    id: "real-estate",
    href: "real-estate-details",
    icon: "home",
    title: "Real Estate Software",
    description:
      "Support property-focused workflows with connected information for teams, buyers, tenants or other stakeholders.",
  },
  {
    id: "custom-software",
    href: "custom-details",
    icon: "code",
    title: "Custom Software",
    description:
      "Build a web platform, internal tool or workflow application for a need your existing products don’t address.",
  },
  {
    id: "mobile-apps",
    href: "mobile-details",
    icon: "phone",
    title: "Mobile Applications",
    description:
      "Plan mobile experiences for customers or staff, including their relationship to your web services and data.",
  },
  {
    id: "ai-chatbots",
    href: "ai-details",
    icon: "bot",
    title: "AI Chatbots",
    description:
      "Explore conversational tools for customer questions, internal knowledge access or other defined use cases.",
  },
  {
    id: "websites",
    href: "websites-details",
    icon: "globe",
    title: "Websites & Portals",
    description:
      "Create responsive websites and digital portals that make information and key actions easier to find.",
  },
  {
    id: "business-support",
    href: "business-support-details",
    icon: "business",
    title: "Outsourcing & BPO Support",
    description:
      "Discuss delegating defined business tasks to a support arrangement with clear responsibilities and handoffs.",
  },
  {
    id: "support",
    href: "support-details",
    icon: "headset",
    title: "Maintenance & Ongoing Support",
    description:
      "Plan continued care for software and systems, from agreed maintenance through to prioritized improvements.",
  },
];

export const serviceDetails = [
  {
    id: "real-estate-details",
    number: "01",
    kicker: "Property workflows",
    title: "Real Estate",
    accent: "Software",
    image: "/assets/services/real-estate.jpg",
    imageAlt: "Modern residential buildings representing property operations.",
    description:
      "Give property teams a clearer way to manage information and follow a customer journey, from enquiry through the next agreed steps.",
    problem:
      "Property information, follow-ups and transaction milestones can become difficult to coordinate when teams rely on disconnected records.",
    approach:
      "Map the property journey and the people involved, then scope the records, handoffs and reporting the system needs to support.",
    inquiry: "Discuss Real Estate Software",
    need: "Real Estate Software",
    estimate: "Plan a property platform",
    features: [
      {
        icon: "database",
        title: "Lead and customer records",
        description:
          "Organize enquiries, contacts and follow-up information around your sales or service process.",
      },
      {
        icon: "home",
        title: "Property and unit information",
        description:
          "Structure property details and availability so relevant teams can work from consistent records.",
      },
      {
        icon: "activity",
        title: "Progress visibility",
        description:
          "Map bookings, documents, payments or handoffs according to your requirements and operating rules.",
      },
    ],
  },
  {
    id: "custom-details",
    number: "02",
    kicker: "Software made for a specific need",
    title: "Custom",
    accent: "Software",
    image: "/assets/services/custom-software.jpg",
    imageAlt: "Developer workspace with code displayed on a computer.",
    description:
      "When generic tools leave a gap, a purpose-built application can give your process a better fit.",
    problem:
      "Manual workarounds and tools that do not match a process can create repeated effort and unclear handoffs.",
    approach:
      "Define the user needs and business rules, then plan the application, integrations and delivery phases around them.",
    inquiry: "Discuss custom software",
    need: "Custom Software",
    estimate: "Shape a software brief",
    features: [
      {
        icon: "code",
        title: "Web applications",
        description:
          "Plan customer-facing or internal software around users, requirements and existing systems.",
      },
      {
        icon: "workflow",
        title: "Workflow automation",
        description:
          "Identify repetitive handoffs and consider where software can reduce manual steps.",
      },
      {
        icon: "activity",
        title: "System integrations",
        description:
          "Define how information should move between the tools and services your team relies on.",
      },
    ],
  },
  {
    id: "mobile-details",
    number: "03",
    kicker: "Useful experiences on the go",
    title: "Mobile",
    accent: "Applications",
    image: "/assets/services/mobile-applications.jpg",
    imageAlt: "Smartphone representing mobile product experiences.",
    description:
      "Consider the tasks people need to complete on their phones and how the app should connect to your services.",
    problem:
      "Important customer or staff tasks may be difficult to complete when away from a desktop or disconnected from business systems.",
    approach:
      "Prioritize mobile journeys and device requirements, then plan how the app should exchange information with existing services.",
    inquiry: "Discuss an app",
    need: "Mobile Applications",
    estimate: "Discuss an app estimate",
    features: [
      {
        icon: "business",
        title: "User and journey planning",
        description:
          "Define key users, essential actions and the right experience for your audience.",
      },
      {
        icon: "phone",
        title: "Mobile product development",
        description:
          "Plan an app experience and implementation approach based on device and product requirements.",
      },
      {
        icon: "activity",
        title: "Connected services",
        description:
          "Review how the app should exchange information with your website, APIs or business systems.",
      },
    ],
  },
  {
    id: "ai-details",
    number: "04",
    kicker: "Conversational experiences",
    title: "AI",
    accent: "Chatbots",
    image: "/assets/services/ai-chatbots.jpg",
    imageAlt: "Abstract digital intelligence visualization.",
    description:
      "Explore where an AI-assisted conversation could help—with clear boundaries, appropriate information and a path to human support when needed.",
    problem:
      "Repeated questions or difficult-to-find information may call for a more direct conversational route, with clear limits and escalation.",
    approach:
      "Choose a defined use case, approve its information sources and plan how people can reach human support when appropriate.",
    inquiry: "Discuss an AI use case",
    need: "AI Chatbots",
    estimate: "Plan a chatbot project",
    features: [
      {
        icon: "sparkles",
        title: "Use-case discovery",
        description:
          "Identify the questions, user needs and limitations an assistant should address.",
      },
      {
        icon: "database",
        title: "Knowledge and content",
        description:
          "Consider approved information sources, updates and access relevant to the experience.",
      },
      {
        icon: "message",
        title: "Handoffs and evaluation",
        description:
          "Define escalation routes and how you’ll assess whether the assistant is useful and appropriate.",
      },
    ],
  },
  {
    id: "websites-details",
    number: "05",
    kicker: "Your digital front door",
    title: "Websites &",
    accent: "Portals",
    image: "/assets/services/websites-portals.jpg",
    imageAlt: "Laptop workspace for web design and online services.",
    description:
      "Give visitors and customers a clear, responsive way to understand your offer and complete important tasks.",
    problem:
      "Visitors can struggle to find relevant information or complete key actions when a site is unclear or difficult to use on their device.",
    approach:
      "Plan the content, page structure and primary user journeys, then build responsive experiences around the agreed requirements.",
    inquiry: "Discuss a website",
    need: "Websites and Portals",
    estimate: "Get a website quote",
    features: [
      {
        icon: "globe",
        title: "Business websites",
        description:
          "Plan page structure, content and calls to action around your audience and goals.",
      },
      {
        icon: "database",
        title: "Customer portals",
        description:
          "Discuss secure, task-focused experiences for customers, partners or other user groups.",
      },
      {
        icon: "phone",
        title: "Responsive foundations",
        description:
          "Make key information and actions accessible across common screen sizes and devices.",
      },
    ],
  },
  {
    id: "business-support-details",
    number: "06",
    kicker: "Extend your operations",
    title: "Outsourcing &",
    accent: "BPO Support",
    image: "/assets/services/business-support.jpg",
    imageAlt: "Colleagues collaborating on operational work.",
    description:
      "Consider a support arrangement for defined tasks when you need extra operational capacity or a different coverage model.",
    problem:
      "A team may need additional capacity for defined operational tasks, but unclear responsibilities can make delegation difficult.",
    approach:
      "Agree the task boundaries, required information, service coverage, quality expectations and escalation handoffs before work begins.",
    inquiry: "Discuss support needs",
    need: "Outsourcing and BPO Support",
    estimate: "Explore a support model",
    features: [
      {
        icon: "check",
        title: "Defined task scope",
        description:
          "Clarify the work to be handled, required information, quality expectations and escalation points.",
      },
      {
        icon: "calendar",
        title: "Agreed coverage",
        description:
          "Discuss hours, communication windows and service expectations that suit your operation.",
      },
      {
        icon: "workflow",
        title: "Operational handoffs",
        description:
          "Set up responsibilities and communication routines so your teams know what happens next.",
      },
    ],
  },
  {
    id: "support-details",
    number: "07",
    kicker: "Keep improving",
    title: "Maintenance &",
    accent: "Ongoing Support",
    image: "/assets/services/ongoing-support.jpg",
    imageAlt: "Digital devices used for ongoing service and support.",
    description:
      "Plan what happens after launch, whether you need help maintaining a system, addressing issues or prioritizing the next improvement.",
    problem:
      "Without an agreed maintenance and issue process, it can be unclear how to keep a system current or prioritize changes after launch.",
    approach:
      "Discuss responsibilities, issue handling, expected coverage and how future improvements should be reviewed and planned.",
    inquiry: "Discuss ongoing support",
    need: "Ongoing Support",
    estimate: "Plan ongoing care",
    features: [
      {
        icon: "headset",
        title: "Maintenance planning",
        description:
          "Discuss system upkeep, responsibilities and the support process appropriate to your software.",
      },
      {
        icon: "activity",
        title: "Issue response",
        description:
          "Agree on a way to report, assess and prioritize issues within a defined support arrangement.",
      },
      {
        icon: "sparkles",
        title: "Ongoing improvements",
        description:
          "Review new requests and plan future work in line with business priorities and available scope.",
      },
    ],
  },
];

export const servicesLeadForm = {
  title: "Tell us what you need",
  description: "We’ll follow up about your enquiry.",
  serviceLabel: "Service you’re interested in",
  serviceOptions: [
    { value: "Real Estate Software", label: "Real Estate Software" },
    { value: "Custom Software", label: "Custom Software" },
    { value: "Mobile Applications", label: "Mobile Applications" },
    { value: "AI Chatbots", label: "AI Chatbots" },
    { value: "Websites and Portals", label: "Websites & Portals" },
    { value: "Outsourcing and BPO Support", label: "Outsourcing & BPO Support" },
    { value: "Ongoing Support", label: "Maintenance & Ongoing Support" },
    { value: "Other", label: "Not sure yet" },
  ],
  privacy:
    "By sending this form, you’re asking Qordic Technologies to contact you about your enquiry.",
};

export const servicesFinalCta = {
  eyebrow: "Start with a conversation",
  title: "Which part of your business needs a better way?",
  description:
    "Share what you’re trying to improve. We’ll help identify the right service, clarify the scope and discuss what a quote would involve.",
};

export const servicesSectionContent = {
  listHeading: {
    eyebrow: "Our capabilities",
    title: "Choose a starting point. We’ll shape the details together.",
    description:
      "These service areas can be scoped individually or combined when your requirements call for it.",
  },
  detailsLinkLabel: "See service details",
  listAction: "Tell us what you need",
};
