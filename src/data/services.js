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
    visual: "property",
    cursor: "property",
    title: "Real Estate Software",
    description:
      "Support property-focused workflows with connected information for teams, buyers, tenants or other stakeholders.",
  },
  {
    id: "custom-software",
    href: "custom-details",
    icon: "code",
    visual: "software",
    cursor: "code",
    title: "Custom Software",
    description:
      "Build a web platform, internal tool or workflow application for a need your existing products don’t address.",
  },
  {
    id: "mobile-apps",
    href: "mobile-details",
    icon: "phone",
    visual: "browser",
    cursor: "code",
    title: "Mobile Applications",
    description:
      "Plan mobile experiences for customers or staff, including their relationship to your web services and data.",
  },
  {
    id: "ai-chatbots",
    href: "ai-details",
    icon: "bot",
    visual: "software",
    cursor: "code",
    title: "AI Chatbots",
    description:
      "Explore conversational tools for customer questions, internal knowledge access or other defined use cases.",
  },
  {
    id: "websites",
    href: "websites-details",
    icon: "globe",
    visual: "browser",
    cursor: "code",
    title: "Websites & Portals",
    description:
      "Create responsive websites and digital portals that make information and key actions easier to find.",
  },
  {
    id: "business-support",
    href: "business-support-details",
    icon: "business",
    visual: "software",
    cursor: "code",
    title: "Outsourcing & BPO Support",
    description:
      "Discuss delegating defined business tasks to a support arrangement with clear responsibilities and handoffs.",
  },
  {
    id: "support",
    href: "support-details",
    icon: "headset",
    visual: "support",
    cursor: "code",
    title: "Maintenance & Ongoing Support",
    description:
      "Plan continued care for software and systems, from agreed maintenance through to prioritized improvements.",
  },
  {
    id: "graphic-design",
    href: "graphic-design-details",
    icon: "sparkles",
    visual: "design",
    cursor: "design",
    title: "Graphic Designing",
    description:
      "Create branding materials, promotional graphics, social media designs and other business-related visual content.",
  },
  {
    id: "seo",
    href: "seo-details",
    icon: "activity",
    visual: "search",
    cursor: "search",
    title: "Search Engine Optimization (SEO)",
    description:
      "Improve website visibility in search engines, optimize website content and help businesses reach relevant audiences organically.",
  },
  {
    id: "video-editing",
    href: "video-editing-details",
    icon: "sparkles",
    visual: "video",
    cursor: "video",
    title: "Video Editing",
    description:
      "Edit promotional videos, social media content, business presentations and other digital media.",
  },
];

export const serviceDetails = [
  {
    id: "real-estate-details",
    number: "01",
    kicker: "Property workflows",
    title: "Real Estate",
    accent: "Software",
    image: "/assets/services/real-estate-solutions.webp",
    imageAlt: "Contemporary residential property with premium open-plan architecture.",
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
  {
    id: "graphic-design-details",
    number: "08",
    kicker: "Visual communication",
    title: "Graphic",
    accent: "Designing",
    visual: "design",
    image: "/assets/services/graphic-design.webp",
    imageAlt: "Graphic design workspace with typography, interface layouts and creative tools.",
    description:
      "Create visual content for branding, promotion, social media and other business-related needs.",
    problem:
      "Businesses need clear, consistent visuals to communicate their identity and present information across channels.",
    approach:
      "Understand the audience and purpose, agree the visual direction and create materials for the intended use.",
    inquiry: "Discuss graphic design",
    need: "Graphic Designing",
    estimate: "Plan your design brief",
    features: [
      {
        icon: "sparkles",
        title: "Branding materials",
        description: "Develop visual materials that present a business identity.",
      },
      {
        icon: "activity",
        title: "Promotional graphics",
        description: "Create graphics for business promotions and communications.",
      },
      {
        icon: "message",
        title: "Social media designs",
        description: "Prepare visual content for social media channels.",
      },
    ],
  },
  {
    id: "seo-details",
    number: "09",
    kicker: "Organic visibility",
    title: "Search Engine",
    accent: "Optimization",
    visual: "search",
    image: "/assets/services/seo-analytics.webp",
    imageAlt: "Analytics dashboard with website traffic graphs and performance metrics.",
    description:
      "Improve website visibility in search engines, optimize website content and help businesses reach relevant audiences organically.",
    problem:
      "Relevant audiences may have difficulty discovering a business when its website content and search visibility need attention.",
    approach:
      "Review the website and its content needs, then define an SEO scope focused on visibility, content optimization and audience relevance.",
    inquiry: "Discuss SEO",
    need: "Search Engine Optimization",
    estimate: "Discuss SEO needs",
    features: [
      {
        icon: "globe",
        title: "Search visibility",
        description: "Focus on improving how a website is presented in search engines.",
      },
      {
        icon: "bookOpen",
        title: "Website content optimization",
        description: "Optimize website content in line with business information and audience needs.",
      },
      {
        icon: "activity",
        title: "Relevant organic reach",
        description: "Help a business reach relevant audiences through organic search visibility.",
      },
    ],
  },
  {
    id: "video-editing-details",
    number: "10",
    kicker: "Digital media",
    title: "Video",
    accent: "Editing",
    visual: "video",
    image: "/assets/services/video-editing.webp",
    imageAlt: "Professional video editing timeline displayed on a workstation monitor.",
    description:
      "Edit promotional videos, social media content, business presentations and other digital media.",
    problem:
      "Useful footage and ideas need to be shaped into clear video content for the intended audience and platform.",
    approach:
      "Discuss the purpose, audience and source material, then plan the editing scope around the final use.",
    inquiry: "Discuss video editing",
    need: "Video Editing",
    estimate: "Plan a video brief",
    features: [
      {
        icon: "sparkles",
        title: "Promotional videos",
        description: "Edit video content for business and promotional communication.",
      },
      {
        icon: "message",
        title: "Social media content",
        description: "Prepare edited video content for social media use.",
      },
      {
        icon: "bookOpen",
        title: "Business presentations",
        description: "Edit video material for business presentations and digital media.",
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
    { value: "Graphic Designing", label: "Graphic Designing" },
    { value: "Search Engine Optimization", label: "SEO" },
    { value: "Video Editing", label: "Video Editing" },
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
