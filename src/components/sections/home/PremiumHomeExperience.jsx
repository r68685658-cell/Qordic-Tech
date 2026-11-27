import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Building2,
  Check,
  Cloud,
  Code2,
  Database,
  Globe2,
  Layers3,
  LayoutDashboard,
  Link2,
  Map,
  MessageCircle,
  Paintbrush2,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../shared/Reveal.jsx";
import { Button } from "../../ui/Button.jsx";
import { Container } from "../../ui/Container.jsx";

const technologyCards = [
  {
    icon: Code2,
    title: "Website Development",
    description: "Professional, responsive websites for businesses, startups, and individuals.",
    capabilities: ["Modern websites", "Responsive layouts", "Better user experiences"],
    image: "/assets/services/websites-portals.jpg",
    imageAlt: "Desktop and laptop screens displaying a modern website and code.",
    imageWidth: 1200,
    imageHeight: 800,
    visual: "browser",
    cursor: "code",
    to: "/services#websites",
    label: "Explore website services",
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom software shaped around business requirements and operational needs.",
    capabilities: ["Custom solutions", "Workflow improvements", "Business operations"],
    image: "/assets/services/custom-software.jpg",
    imageAlt: "Developer workstation with software code shown across computer screens.",
    imageWidth: 1200,
    imageHeight: 800,
    visual: "software",
    cursor: "code",
    to: "/services#custom-software",
    label: "Explore software",
  },
  {
    icon: Paintbrush2,
    title: "Graphic Designing",
    description: "Creative visuals for branding, promotion, social media, and business needs.",
    capabilities: ["Branding materials", "Promotional graphics", "Social media designs"],
    image: "/assets/services/graphic-design.webp",
    imageAlt: "Graphic design workspace with typography, interface layouts and creative tools.",
    imageWidth: 1400,
    imageHeight: 900,
    visual: "design",
    cursor: "design",
    to: "/services",
    label: "Explore design services",
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    description: "Improve search visibility, optimize website content, and reach relevant audiences organically.",
    capabilities: ["Search visibility", "Content optimization", "Organic reach"],
    image: "/assets/services/seo-analytics.webp",
    imageAlt: "Analytics dashboard with website traffic graphs and performance metrics.",
    imageWidth: 1400,
    imageHeight: 900,
    visual: "search",
    cursor: "search",
    to: "/services",
    label: "Discuss SEO",
  },
  {
    icon: Play,
    title: "Video Editing",
    description: "Polished video content for promotion, social media, presentations, and digital media.",
    capabilities: ["Promotional videos", "Social content", "Business presentations"],
    image: "/assets/services/video-editing.webp",
    imageAlt: "Professional video editing timeline displayed on a workstation monitor.",
    imageWidth: 1400,
    imageHeight: 900,
    visual: "video",
    cursor: "video",
    to: "/services",
    label: "Discuss video editing",
  },
  {
    icon: Building2,
    title: "Real Estate Solutions",
    description: "Digital solutions that help real estate businesses present properties and promote services.",
    capabilities: ["Property presentation", "Digital promotion", "Business solutions"],
    image: "/assets/services/real-estate-solutions.webp",
    imageAlt: "Contemporary residential property with premium open-plan architecture.",
    imageWidth: 1400,
    imageHeight: 900,
    visual: "property",
    cursor: "property",
    to: "/services#real-estate",
    label: "Explore all services",
  },
];

const stages = [
  { icon: Map, title: "Discovery", description: "Understand the business goal, users, workflows and constraints before defining the work." },
  { icon: Layers3, title: "Strategy", description: "Agree priorities, scope, dependencies and a practical delivery plan together." },
  { icon: Paintbrush2, title: "UI/UX Design", description: "Shape the key journeys and interface direction around the people using the product." },
  { icon: Code2, title: "Development", description: "Build in focused stages, keeping progress visible and feedback timely." },
  { icon: ShieldCheck, title: "Testing & Quality", description: "Check the agreed experience and prepare the product for its intended use." },
  { icon: Rocket, title: "Launch & Support", description: "Plan the handoff, launch and any maintenance or improvements needed afterwards." },
];

const conceptExperiences = [
  {
    icon: LayoutDashboard,
    category: "Business software",
    title: "Operations workspace",
    description: "A concept for bringing routine tasks, records and team handoffs into one view.",
    tags: ["Workflow", "Records", "Reporting"],
    theme: "violet",
    to: "/services#erp",
    serviceLabel: "Explore software services",
  },
  {
    icon: Globe2,
    category: "Web experience",
    title: "Customer service portal",
    description: "An illustrative portal concept for helping customers find information and complete common tasks.",
    tags: ["Web portal", "Self-service", "Responsive"],
    theme: "cyan",
    to: "/services#websites",
    serviceLabel: "Explore web services",
  },
  {
    icon: Smartphone,
    category: "Mobile product",
    title: "Connected field companion",
    description: "A sample mobile experience concept for staff who need relevant work information on the go.",
    tags: ["Mobile", "Tasks", "Connected data"],
    theme: "pink",
    to: "/services#mobile-apps",
    serviceLabel: "Explore mobile apps",
  },
];

const whyChooseQordic = [
  { icon: MessageCircle, title: "Clear communication", description: "Agree on points of contact, channels and an update rhythm during project planning." },
  { icon: Workflow, title: "Scope shaped around you", description: "Start with your workflows and constraints, then define the right next step together." },
  { icon: ShieldCheck, title: "Security considered early", description: "Bring access, data handling and relevant risks into the conversation from the start." },
  { icon: Sparkles, title: "Support beyond launch", description: "Discuss maintenance and improvements as your systems and priorities evolve." },
];

const technologyAreas = [
  { icon: Globe2, title: "Web experiences", description: "Websites, portals and browser-based products." },
  { icon: Code2, title: "Application services", description: "Software shaped around business workflows." },
  { icon: Smartphone, title: "Mobile products", description: "Experiences for customers and staff on the go." },
  { icon: Bot, title: "AI integrations", description: "Defined conversational and AI-assisted use cases." },
  { icon: Database, title: "Data and reporting", description: "Information structures that fit project needs." },
  { icon: Link2, title: "APIs and integrations", description: "Connections to the systems a project relies on." },
  { icon: Cloud, title: "Cloud services", description: "Cloud platform requirements considered per project." },
  { icon: Boxes, title: "Business platforms", description: "Business and real-estate workflows and capabilities." },
];

function SpotlightCard({ className = "", children, cursor, ...props }) {
  function updateTilt(event) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--spot-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 4}deg`);
  }

  function resetTilt(event) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--spot-x", "50%");
    event.currentTarget.style.setProperty("--spot-y", "50%");
  }

  return (
    <article
      {...props}
      data-cursor={cursor}
      className={`phase8-tilt ${className}`}
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
    >
      {children}
    </article>
  );
}

export function TechnologyUniverse() {
  return (
    <div className="phase8-universe-grid">
      {technologyCards.map(({ icon: Icon, ...item }, index) => (
        <Reveal key={item.title} delay={(index % 3) * 0.045}>
          <SpotlightCard className="phase8-universe-card" cursor={item.cursor}>
            <div className={`phase8-service-visual phase8-service-${item.visual}`}>
              <img
                src={item.image}
                alt={item.imageAlt}
                width={item.imageWidth}
                height={item.imageHeight}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 819px) calc(100vw - 3rem), (max-width: 1279px) 30vw, 360px"
              />
            </div>
            <span className="phase8-card-icon"><Icon size={22} aria-hidden="true" /></span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul>{item.capabilities.map((capability) => <li key={capability}><Check size={14} />{capability}</li>)}</ul>
            <Link to={item.to} aria-label={`${item.label}: ${item.title}`}>
              {item.label}<ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}

export function VisionTimeline() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="phase8-timeline-wrap">
      <motion.div
        className="phase8-timeline-progress"
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 1.15, ease: "easeOut" }}
        aria-hidden="true"
      />
      <ol className="phase8-timeline">
        {stages.map(({ icon: Icon, ...stage }, index) => (
          <motion.li
            className="phase8-timeline-item"
            key={stage.title}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.05 }}
          >
            <div className="phase8-timeline-stage">
              <span className="phase8-timeline-icon"><Icon size={20} aria-hidden="true" /></span>
              <span className="phase8-timeline-number">0{index + 1}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
      <p className="phase8-caption">A typical project flow; stages are tailored to the agreed scope.</p>
    </div>
  );
}

export function ConceptExperiences() {
  return (
    <div className="phase8-concept-grid">
      {conceptExperiences.map(({ icon: Icon, ...item }, index) => (
        <Reveal key={item.title} delay={index * 0.06}>
          <SpotlightCard className={`phase8-concept-card phase8-concept-${item.theme}`}>
            <div className="phase8-concept-visual" aria-hidden="true">
              <div className="phase8-concept-window">
                <span className="phase8-window-dots"><i /><i /><i /></span>
                <Icon size={34} />
                <span className="phase8-concept-bars"><i /><i /><i /></span>
              </div>
              <span className="phase8-concept-glow" />
            </div>
            <div className="phase8-concept-copy">
              <span className="phase8-concept-label">Concept experience · {item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="phase8-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <Link className="phase8-concept-link" to={item.to}>{item.serviceLabel}<ArrowUpRight size={15} /></Link>
            </div>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}

const demoViews = {
  Overview: {
    title: "Workspace overview",
    description: "A sample view of tasks and information in a business workspace.",
    items: [
      { name: "Review incoming requests", meta: "Operations · Demo task", status: "In review" },
      { name: "Update customer records", meta: "Customer care · Demo task", status: "In progress" },
      { name: "Prepare weekly handoff", meta: "Team workflow · Demo task", status: "Planned" },
    ],
  },
  Projects: {
    title: "Project spaces",
    description: "Example project cards illustrating how work might be grouped.",
    items: [
      { name: "Website refresh", meta: "Digital experience · Demo project", status: "Planning" },
      { name: "Mobile service portal", meta: "Product concept · Demo project", status: "Discovery" },
      { name: "Operations workspace", meta: "Business software · Demo project", status: "Scoping" },
    ],
  },
  Activity: {
    title: "Recent activity",
    description: "Illustrative updates in a shared project workspace.",
    items: [
      { name: "Requirements note added", meta: "Project team · Demo activity", status: "Just now" },
      { name: "Review requested", meta: "Design planning · Demo activity", status: "Today" },
      { name: "Task marked for discussion", meta: "Operations · Demo activity", status: "Today" },
    ],
  },
};

export function SoftwareDemo() {
  const [activeView, setActiveView] = useState("Overview");
  const active = demoViews[activeView];
  return (
    <div className="phase8-demo-shell">
      <div className="phase8-demo-sidebar">
        <div className="phase8-demo-brand"><span><Boxes size={18} /></span><strong>Workspace</strong></div>
        <span className="phase8-demo-nav-label">DEMO NAVIGATION</span>
        {Object.keys(demoViews).map((view) => (
          <button
            type="button"
            className={activeView === view ? "is-active" : ""}
            key={view}
            onClick={() => setActiveView(view)}
            aria-pressed={activeView === view}
          >
            {view === "Overview" ? <LayoutDashboard size={16} /> : view === "Projects" ? <Layers3 size={16} /> : <Workflow size={16} />}
            {view}
          </button>
        ))}
        <span className="phase8-demo-sidebar-note">Illustrative interface only.<br />No customer data.</span>
      </div>
      <div className="phase8-demo-main">
        <div className="phase8-demo-topbar">
          <div><span className="phase8-demo-eyebrow">INTERACTIVE PRODUCT CONCEPT</span><h3>{active.title}</h3></div>
          <span className="phase8-demo-chip"><Sparkles size={14} /> Demo data</span>
        </div>
        <p className="phase8-demo-description">{active.description}</p>
        <div className="phase8-demo-summary">
          <article><span>Open items</span><strong>08</strong><small>Illustrative count</small></article>
          <article><span>Needs review</span><strong>03</strong><small>Illustrative count</small></article>
          <article><span>Recent updates</span><strong>12</strong><small>Illustrative count</small></article>
        </div>
        <div className="phase8-demo-content">
          <div className="phase8-demo-list">
            <div className="phase8-demo-list-heading"><strong>{activeView === "Activity" ? "Activity feed" : "Work in focus"}</strong><span>Sample content</span></div>
            {active.items.map((item) => (
              <article key={item.name}>
                <span className="phase8-demo-item-icon"><Check size={15} /></span>
                <span className="phase8-demo-item-copy"><strong>{item.name}</strong><small>{item.meta}</small></span>
                <span className="phase8-demo-status">{item.status}</span>
              </article>
            ))}
          </div>
          <div className="phase8-demo-chart">
            <div className="phase8-demo-list-heading"><strong>Activity trend</strong><span>Illustrative</span></div>
            <div className="phase8-demo-chart-area" aria-label="Illustrative sample activity chart">
              {[34, 52, 42, 69, 58, 84, 72].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
            </div>
            <div className="phase8-demo-chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyQordic() {
  return (
    <div className="phase8-why-grid">
      {whyChooseQordic.map(({ icon: Icon, ...item }, index) => (
        <Reveal key={item.title} delay={index * 0.055}>
          <SpotlightCard className="phase8-why-card">
            <span className="phase8-card-icon"><Icon size={21} aria-hidden="true" /></span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}

export function TechnologyEcosystem() {
  return (
    <>
      <div className="phase8-tech-grid">
        {technologyAreas.map(({ icon: Icon, ...item }, index) => (
          <Reveal key={item.title} delay={(index % 4) * 0.035}>
            <SpotlightCard className="phase8-tech-card">
              <span><Icon size={20} aria-hidden="true" /></span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
      <p className="phase8-caption">Specific platforms and tools are selected to suit each project; this capability map is not a vendor endorsement or fixed technology stack.</p>
    </>
  );
}

export function PremiumProjectCTA() {
  return (
    <section className="phase8-project-cta" aria-labelledby="phase8-project-cta-title">
      <div className="phase8-cta-rings" aria-hidden="true"><i /><i /><i /></div>
      <Container className="phase8-project-cta-content">
        <Reveal>
          <span className="phase8-cta-eyebrow"><Sparkles size={15} /> LET'S MAKE THE NEXT STEP CLEAR</span>
          <h2 id="phase8-project-cta-title">Have an Idea? Let’s Build Something Exceptional.</h2>
          <p>From useful software to connected digital experiences, let’s understand your vision and shape a practical path forward.</p>
          <div className="phase8-cta-actions">
            <Button to="/start-project">Start Your Project <ArrowRight size={17} /></Button>
            <Link to="/start-project">Talk to Our Team <ArrowDownRight size={17} /></Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
