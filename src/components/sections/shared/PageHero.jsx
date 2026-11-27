import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "../../ui/Badge.jsx";
import { Button } from "../../ui/Button.jsx";
import { Container } from "../../ui/Container.jsx";
import { Reveal } from "./Reveal.jsx";
import { RotatingTagline } from "./RotatingTagline.jsx";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  primaryAction,
  secondaryAction,
  note,
  taglines,
  splitTitle = false,
  visual = false,
  scrollTarget,
  visualLabel = "Illustration of connected business workflows",
}) {
  const reduceMotion = useReducedMotion();
  const accessibleTitle = [title, accent].filter(Boolean).join(" ");

  function renderTitlePart(text, startIndex = 0, gradientText = false) {
    let letterIndex = startIndex;
    let gradientLetterIndex = 0;
    const gradientLetterCount = Array.from(text.replace(/\s/g, "")).length;
    return text.split(" ").map((word, wordIndex) => {
      const currentWord = Array.from(word).map((letter) => {
        const index = letterIndex++;
        const gradientPosition = gradientLetterCount > 1
          ? (gradientLetterIndex / (gradientLetterCount - 1)) * 100
          : 0;
        gradientLetterIndex += 1;
        return (
          <motion.span
            className={`hero-title-letter${gradientText ? " hero-title-letter-accent" : ""}`}
            key={`${wordIndex}-${index}`}
            style={gradientText ? { backgroundPosition: `${gradientPosition}% 0` } : undefined}
            initial={reduceMotion ? false : { opacity: 0, y: "0.55em", rotateX: -45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.28 + index * 0.018, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {letter}
          </motion.span>
        );
      });
      letterIndex += 1;
      return (
        <span className="hero-title-word" key={`${word}-${wordIndex}`}>
          {currentWord}
          {wordIndex < text.split(" ").length - 1 ? "\u00a0" : ""}
        </span>
      );
    });
  }

  return (
    <section
      className="page-hero relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-labelledby="page-title"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--hero-pointer-x",
          `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
        );
        event.currentTarget.style.setProperty(
          "--hero-pointer-y",
          `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
        );
      }}
    >
      <div className="pointer-events-none absolute -right-36 -top-32 -z-10 size-96 rounded-full bg-violet/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-36 left-0 -z-10 size-80 rounded-full bg-coral/10 blur-3xl" />
      <Container className={visual ? "grid items-center gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-16" : ""}>
        <Reveal className="max-w-3xl">
          {eyebrow && (
            <Badge className="mb-5">
              <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
              {eyebrow}
            </Badge>
          )}
          <motion.h1
            id="page-title"
            className="w-full max-w-full text-4xl font-extrabold leading-[1.12] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl"
            aria-label={splitTitle ? accessibleTitle : undefined}
            initial={reduceMotion ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {splitTitle ? (
              <span aria-hidden="true">
                {renderTitlePart(title)}
                {accent && (
                  <span className="hero-title-accent">
                    {renderTitlePart(accent, title.length + 1, true)}
                  </span>
                )}
              </span>
            ) : (
              <>
                {title}{" "}
                {accent && <span className="bg-brand-gradient bg-clip-text text-transparent">{accent}</span>}
              </>
            )}
          </motion.h1>
          {taglines && <RotatingTagline items={taglines} />}
          <motion.p
            className={`${taglines ? "mt-3" : "mt-6"} max-w-prose text-base leading-relaxed text-muted sm:text-lg`}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.25 }}
          >
            {description}
          </motion.p>
          {(primaryAction || secondaryAction) && (
            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.38 }}
            >
              {primaryAction && (
                <Button to={primaryAction.to}>
                  {primaryAction.label}
                  <ArrowUpRight aria-hidden="true" size={17} />
                </Button>
              )}
              {secondaryAction && (
                <Button href={secondaryAction.href} to={secondaryAction.to} variant="secondary">
                  {secondaryAction.label}
                </Button>
              )}
            </motion.div>
          )}
          {note && (
            <p className="mt-7 flex max-w-xl items-start gap-3 text-sm text-muted">
              <Sparkles className="mt-0.5 shrink-0 text-violet-strong" aria-hidden="true" size={18} />
              <span>{note}</span>
            </p>
          )}
        </Reveal>
        {visual && <HeroVisual label={visualLabel} />}
      </Container>
      {scrollTarget && (
        <a
          className="mx-auto mt-10 flex min-h-11 w-fit items-center gap-2 rounded-full px-3 text-xs font-bold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          href={`#${scrollTarget.id}`}
        >
          <ArrowDown aria-hidden="true" size={16} />
          {scrollTarget.label}
        </a>
      )}
    </section>
  );
}

function HeroVisual({ label }) {
  const visualRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isCompact, setIsCompact] = useState(
    () => window.matchMedia("(max-width: 819px), (prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 819px), (prefers-reduced-motion: reduce)");
    const updateCompactMode = () => setIsCompact(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateCompactMode);
    return () => mediaQuery.removeEventListener("change", updateCompactMode);
  }, []);

  return (
    <div
      ref={visualRef}
      className="hero-visual relative mx-auto w-full max-w-[540px] py-8"
      role="group"
      aria-label={label}
    >
      <div className="hero-scene-layer" aria-hidden="true">
        {isCompact || reduceMotion ? (
          <StaticHeroVisual />
        ) : (
          <Suspense fallback={<div className="hero-scene-fallback" />}>
            <HeroScene eventSource={visualRef} />
          </Suspense>
        )}
      </div>
      <div className="hero-aura absolute inset-10 rounded-full bg-brand-gradient opacity-20 blur-3xl" aria-hidden="true" />
      <div className="hero-float-panel hero-network-panel absolute -left-2 top-1 z-10 rounded-2xl border border-line bg-surface/85 p-3 shadow-lift backdrop-blur-xl sm:-left-5">
        <span className="flex items-center gap-2 text-xs font-bold text-ink">
          <i className="hero-status-dot" aria-hidden="true" />
          Connected systems
        </span>
        <span className="mt-1 block text-[11px] text-muted">Software · Data · Teams</span>
      </div>
      <div className="hero-float-panel hero-data-panel absolute -bottom-1 -right-2 z-10 rounded-2xl border border-line bg-surface/85 p-3 shadow-lift backdrop-blur-xl sm:-right-5">
        <span className="block text-xs font-bold text-ink">Digital workflows</span>
        <span className="mt-1 block text-[11px] text-muted">Software + support</span>
      </div>
    </div>
  );
}

function StaticHeroVisual() {
  return (
    <div className="hero-static-visual">
      <span className="hero-static-orbit hero-static-orbit-one" />
      <span className="hero-static-orbit hero-static-orbit-two" />
      <img src="/assets/brand/qordic-mark.png" alt="" />
    </div>
  );
}
