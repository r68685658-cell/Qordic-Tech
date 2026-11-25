import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "../ui/Badge.jsx";
import { Container } from "../ui/Container.jsx";
import { PageMeta } from "./PageMeta.jsx";

export function PagePlaceholder({ page }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <PageMeta page={page} />
      <main id="main" className="flex-1" tabIndex={-1}>
        <Container>
          <motion.section
            className="mx-auto flex min-h-[55vh] max-w-content flex-col justify-center py-16 sm:py-24"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
            aria-labelledby="page-title"
          >
            <Badge className="mb-5 w-fit">Foundation</Badge>
            <h1
              id="page-title"
              className="max-w-3xl text-4xl font-extrabold tracking-tight text-ink sm:text-6xl"
            >
              {page.label}
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted">
              This page will be migrated section by section. The existing
              source content remains unchanged while the React foundation is
              prepared.
            </p>
          </motion.section>
        </Container>
      </main>
    </>
  );
}
