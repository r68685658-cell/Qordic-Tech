import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Check,
  Cloud,
  Code2,
  Database,
  Globe2,
  Headset,
  HeartPulse,
  Home,
  Layers3,
  MessageCircle,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../ui/Card.jsx";
import { Reveal } from "./Reveal.jsx";

const icons = {
  activity: Activity,
  bot: Bot,
  building: Building2,
  bookOpen: BookOpen,
  calendar: CalendarClock,
  check: Check,
  cloud: Cloud,
  code: Code2,
  database: Database,
  globe: Globe2,
  headset: Headset,
  healthcare: HeartPulse,
  home: Home,
  layers: Layers3,
  message: MessageCircle,
  phone: Smartphone,
  sparkles: Sparkles,
  workflow: Workflow,
  business: BriefcaseBusiness,
};

export function FeatureGrid({
  items,
  columns = 3,
  className = "",
  linked = false,
  ariaLabel,
}) {
  const columnClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
    6: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  }[columns];

  return (
    <div className={`grid gap-4 ${columnClass} ${className}`} aria-label={ariaLabel}>
      {items.map((item, index) => {
        const Icon = icons[item.icon] ?? Sparkles;
        const content = (
          <Card
            className="h-full p-5 sm:p-6"
            interactive
            data-cursor={item.cursor}
            key={item.title}
          >
            {item.visual && (
              <div className={`service-card-visual service-card-visual-${item.visual}`} aria-hidden="true">
                <span><Icon size={28} strokeWidth={1.7} /></span>
                <i />
              </div>
            )}
            <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-violet/10 text-violet-strong">
              <Icon aria-hidden="true" size={22} />
            </span>
            {item.kicker && (
              <span className="mb-2 inline-flex rounded-full bg-coral/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-rose-800 dark:text-rose-200">
                {item.kicker}
              </span>
            )}
            <h3 className="text-lg font-bold tracking-tight text-ink">{item.title}</h3>
            {item.description && (
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            )}
            {item.detail && (
              <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-sm font-medium text-ink">
                <ArrowUpRight className="mt-0.5 shrink-0 text-violet-strong" aria-hidden="true" size={16} />
                <span>{item.detail}</span>
              </p>
            )}
            {item.link && (
              <span className="mt-4 inline-flex min-h-11 items-center gap-1 font-bold text-violet-strong">
                {item.link.label}
                <ArrowUpRight aria-hidden="true" size={16} />
              </span>
            )}
          </Card>
        );

        return (
          <Reveal className="h-full" delay={index % columns * 0.04} key={item.title}>
            {linked && item.link ? (
              <Link
                className="block h-full rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                to={item.link.to}
                aria-label={`${item.title}: ${item.link.label}`}
              >
                {content}
              </Link>
            ) : (
              content
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
