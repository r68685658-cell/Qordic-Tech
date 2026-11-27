import { AnimatePresence, motion } from "framer-motion";
import { SkipForward } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const INTRO_DURATION_MS = 5000;

const particles = [
  { x: "12%", y: "26%", delay: 0.05 },
  { x: "23%", y: "70%", delay: 0.18 },
  { x: "35%", y: "18%", delay: 0.3 },
  { x: "67%", y: "24%", delay: 0.12 },
  { x: "78%", y: "68%", delay: 0.25 },
  { x: "89%", y: "38%", delay: 0.38 },
  { x: "53%", y: "82%", delay: 0.2 },
  { x: "8%", y: "54%", delay: 0.32 },
];

const circuits = [
  "M 0 25 H 22 V 40 H 35",
  "M 0 72 H 14 V 58 H 29",
  "M 100 30 H 82 V 47 H 69",
  "M 100 76 H 87 V 61 H 74",
  "M 24 0 V 20 H 38",
  "M 80 0 V 20 H 67",
  "M 31 100 V 82 H 43",
  "M 70 100 V 81 H 58",
];

function wasIntroSeen() {
  try {
    return window.sessionStorage.getItem("qordic-intro-seen") === "true";
  } catch (error) {
    console.warn("Unable to read the intro preference from session storage.", error);
    return false;
  }
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem("qordic-intro-seen", "true");
  } catch (error) {
    console.warn("Unable to save the intro preference to session storage.", error);
  }
}

export function CinematicIntro() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const finishedRef = useRef(false);
  const timeoutRef = useRef(null);

  const finishIntro = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    markIntroSeen();
    setVisible(false);
  }, []);

  useEffect(() => {
    if (
      pathname !== "/" ||
      wasIntroSeen() ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      finishIntro();
      return undefined;
    }

    finishedRef.current = false;
    setVisible(true);
    timeoutRef.current = window.setTimeout(finishIntro, INTRO_DURATION_MS);
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [finishIntro, pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          role="status"
          aria-label="Qordic Technologies introduction"
        >
          <svg className="cinematic-circuits" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {circuits.map((path, index) => (
              <motion.path
                d={path}
                key={path}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.42 }}
                transition={{ duration: 0.8, delay: 0.12 + index * 0.045, ease: "easeOut" }}
              />
            ))}
          </svg>

          <div className="cinematic-particles" aria-hidden="true">
            {particles.map((particle, index) => (
              <motion.i
                key={index}
                style={{ left: particle.x, top: particle.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.9, 0.35], scale: [0, 1, 0.7] }}
                transition={{ duration: 1.35, delay: particle.delay, repeat: 1, repeatType: "reverse" }}
              />
            ))}
          </div>

          <div className="cinematic-core">
            <motion.div
              className="cinematic-orbit cinematic-orbit-one"
              initial={{ opacity: 0, rotate: -35, scale: 0.65 }}
              animate={{ opacity: 1, rotate: 18, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
            <motion.div
              className="cinematic-orbit cinematic-orbit-two"
              initial={{ opacity: 0, rotate: 42, scale: 0.7 }}
              animate={{ opacity: 0.72, rotate: -15, scale: 1 }}
              transition={{ duration: 1.25, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
            <motion.img
              className="cinematic-logo"
              src="/assets/brand/qordic-logo-dark.png"
              alt=""
              initial={{ opacity: 0, scale: 0.72, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.72, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p
              className="cinematic-tagline"
              initial={{ opacity: 0, y: 10, letterSpacing: "0.42em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.24em" }}
              transition={{ duration: 0.55, delay: 0.82 }}
            >
              YOUR VISION, IN MOTION
            </motion.p>
          </div>

          <button className="cinematic-skip" type="button" onClick={finishIntro}>
            Skip intro <SkipForward size={15} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
