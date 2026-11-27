import { Building2, Code2, MousePointer2, Palette, Play, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const cursorIcons = {
  code: Code2,
  design: Palette,
  search: Search,
  video: Play,
  property: Building2,
};

export function BrandedCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const iconRef = useRef(null);
  const pointer = useRef({ x: -100, y: -100, ringX: -100, ringY: -100, frame: 0 });
  const rippleTimer = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [iconName, setIconName] = useState("");
  const [ripple, setRipple] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px) and (prefers-reduced-motion: no-preference)");
    const updateAvailability = () => setEnabled(mediaQuery.matches);
    updateAvailability();
    mediaQuery.addEventListener("change", updateAvailability);

    return () => mediaQuery.removeEventListener("change", updateAvailability);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    document.body.classList.add("qordic-cursor-enabled");

    function moveCursor(event) {
      if (event.pointerType && event.pointerType !== "mouse") return;
      const current = pointer.current;
      current.x = event.clientX;
      current.y = event.clientY;
      setVisible(true);

      const target = event.target instanceof Element ? event.target : null;
      const context = target?.closest("[data-cursor]");
      const interactive = Boolean(target?.closest("a, button, [role='button'], [data-cursor]"));
      setIsInteractive((previous) => previous !== interactive ? interactive : previous);
      const nextIcon = context?.getAttribute("data-cursor") || "";
      setIconName((previous) => previous !== nextIcon ? nextIcon : previous);

      if (current.frame) return;
      const animate = () => {
        const { x, y } = current;
        current.ringX += (x - current.ringX) * 0.22;
        current.ringY += (y - current.ringY) * 0.22;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${current.ringX}px, ${current.ringY}px, 0)`;
        }
        if (iconRef.current) {
          iconRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }

        if (Math.abs(x - current.ringX) > 0.2 || Math.abs(y - current.ringY) > 0.2) {
          current.frame = window.requestAnimationFrame(animate);
        } else {
          current.frame = 0;
        }
      };
      current.frame = window.requestAnimationFrame(animate);
    }

    function handleClick(event) {
      setRipple({ x: event.clientX, y: event.clientY, id: Date.now() });
      window.clearTimeout(rippleTimer.current);
      rippleTimer.current = window.setTimeout(() => setRipple(null), 420);
    }

    function handlePointerLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.body.classList.remove("qordic-cursor-enabled");
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("pointerleave", handlePointerLeave);
      if (pointer.current.frame) window.cancelAnimationFrame(pointer.current.frame);
      window.clearTimeout(rippleTimer.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ContextIcon = cursorIcons[iconName] || MousePointer2;

  return (
    <div className={`qordic-cursor ${visible ? "is-visible" : ""} ${isInteractive ? "is-interactive" : ""}`} aria-hidden="true">
      <span className="qordic-cursor-ring" ref={ringRef} />
      <span className="qordic-cursor-dot" ref={dotRef} />
      {iconName && <ContextIcon className="qordic-cursor-icon" ref={iconRef} size={15} strokeWidth={2} />}
      {ripple && (
        <span
          key={ripple.id}
          className="qordic-cursor-ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      )}
    </div>
  );
}
