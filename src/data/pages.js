const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Qordic Technologies",
  description:
    "Software, real estate technology, AI chatbot, mobile app and business support services.",
};

export const pages = [
  {
    path: "/",
    label: "Home",
    title: "Qordic Technologies | Software & Business Support",
    description:
      "Build the software and support your business needs. Explore custom software, real estate platforms, AI chatbots, mobile apps and outsourced support with Qordic Technologies.",
    schema: organizationSchema,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Qordic Technologies",
    description: "Learn how Qordic Technologies describes handling information submitted through this website.",
  },
  {
    path: "/terms",
    title: "Terms & Conditions | Qordic Technologies",
    description: "Review the terms that govern use of the Qordic Technologies website.",
  },
  {
    path: "/services",
    label: "Services",
    title: "Our Services | Qordic Technologies",
    description:
      "Explore Qordic Technologies services: real estate software, custom software, mobile apps, AI chatbots, websites, outsourced support and ongoing maintenance.",
    schema: organizationSchema,
  },
  {
    path: "/solutions",
    label: "Solutions",
    title: "Solutions | Qordic Technologies",
    description:
      "Explore Qordic Technologies technology solutions for real estate, healthcare, e-commerce, AI agents and more.",
  },
  {
    path: "/process",
    label: "Process",
    title: "Process | Qordic Technologies",
    description:
      "Learn how Qordic Technologies works through discovery, design, development, deployment and support.",
  },
  {
    path: "/global",
    label: "Global",
    title: "Global Delivery | Qordic Technologies",
    description:
      "Discover Qordic Technologies global delivery approach, timezone-friendly coordination and 24/7 support coverage.",
  },
  {
    path: "/about",
    label: "About",
    title: "About | Qordic Technologies",
    description:
      "Learn about Qordic Technologies, our story, values and the team shaping software and support for growing businesses.",
  },
  {
    path: "/blog",
    label: "Blog",
    title: "Blog | Qordic Technologies",
    description:
      "Explore Qordic Technologies blog ideas and updates about real estate software, AI chatbots, cybersecurity, data analytics and mobile apps.",
  },
  {
    path: "/faq",
    label: "FAQ",
    title: "FAQ | Qordic Technologies",
    description:
      "Read common Qordic Technologies questions about pricing, timelines, security, support, code ownership and communication.",
  },
  {
    path: "/estimate",
    label: "Estimate",
    title: "Estimate | Qordic Technologies",
    description:
      "Share project requirements with Qordic Technologies for custom software, real estate platforms, websites, mobile apps and AI chatbot projects.",
  },
  {
    path: "/contact",
    label: "Contact",
    title: "Contact | Qordic Technologies",
    description:
      "Tell Qordic Technologies what your business needs. Start a conversation about software, real estate platforms, AI chatbots, mobile apps and operational support.",
  },
  {
    path: "/start-project",
    label: "Start a Project",
    title: "Start a Project | Qordic Technologies",
    description:
      "Tell Qordic Technologies about your software, real estate, website, design, SEO or video project.",
  },
];

export const navigationLinks = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export const exploreLinks = [
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const companyLinks = [
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];
