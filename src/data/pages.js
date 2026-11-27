import { businessInfo } from "./business.js";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://qordictech.com/#organization",
  name: businessInfo.name,
  alternateName: businessInfo.alternateName,
  url: businessInfo.website,
  logo: {
    "@type": "ImageObject",
    url: "https://qordictech.com/assets/brand/qordic-mark.png",
  },
  description: businessInfo.description,
  ...(businessInfo.socialProfiles.length
    ? { sameAs: businessInfo.socialProfiles }
    : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://qordictech.com/#website",
  url: businessInfo.website,
  name: "Qordic Technologies",
  alternateName: "Qordic Tech",
  publisher: { "@id": "https://qordictech.com/#organization" },
};

export const pages = [
  {
    path: "/",
    label: "Home",
    title: "Qordic Technologies (Qordic Tech) | Digital Services",
    description: businessInfo.description,
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
      "Explore Qordic Technologies services: custom and real-estate software, mobile apps, AI chatbots, websites and portals, BPO support, maintenance, graphic design, SEO and video editing.",
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
    title: "About Qordic Technologies (Qordic Tech)",
    description:
      "Qordic Technologies (Qordic Tech) offers software, web, mobile, AI, real-estate, BPO, design, SEO, video and ongoing support services for businesses.",
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
    noindex: true,
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
