import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../ui/Card.jsx";
import { TabsPanel } from "../shared/TabsPanel.jsx";

export function WorkflowPreview({ workflow }) {
  return (
    <TabsPanel
      label="Industry workflow examples"
      items={[
        {
          id: "real-estate",
          label: "Real Estate",
          content: <WorkflowContent workflow={workflow} />,
        },
        {
          id: "healthcare",
          label: "Healthcare",
          content: (
            <WorkflowPlaceholder
              label="Healthcare"
              href="/solutions#healthcare"
            />
          ),
        },
        {
          id: "ecommerce",
          label: "E-commerce"
          ,
          content: (
            <WorkflowPlaceholder
              label="E-commerce"
              href="/solutions#ecommerce"
            />
          ),
        },
        {
          id: "ai-agents",
          label: "AI Agents",
          content: (
            <WorkflowPlaceholder
              label="AI Agents"
              href="/solutions#ai-agents"
            />
          ),
        },
      ]}
      initialTab="real-estate"
    />
  );
}

function WorkflowContent({ workflow }) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-violet-strong">
        {workflow.kicker}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-ink">{workflow.title}</h3>
      <p className="mt-2 max-w-prose text-sm text-muted">{workflow.description}</p>
      <ol className="mt-6 grid gap-2 sm:grid-cols-3">
        {workflow.steps.map((step, index) => (
          <li
            className="flex items-center gap-3 rounded-xl border border-line bg-page p-3"
            key={step}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-violet/10 text-xs font-extrabold text-violet-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-bold text-ink">{step}</span>
            {index < workflow.steps.length - 1 && (
              <ArrowRight
                className="ml-auto hidden text-muted sm:block"
                aria-hidden="true"
                size={15}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function WorkflowPlaceholder({ label, href }) {
  return (
    <Card className="flex min-h-48 flex-col items-start justify-center">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-violet-strong">
        {label}
      </p>
      <h3 className="mt-2 text-2xl font-bold text-ink">
        Explore this example workflow.
      </h3>
      <Link
        className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-violet-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        to={href}
      >
        View {label} solution <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </Card>
  );
}
