export function Card({
  as: Element = "article",
  className = "",
  interactive = false,
  children,
  ...props
}) {
  const interaction = interactive
    ? "premium-card transition-all duration-200 hover:border-violet/50 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none"
    : "";

  return (
    <Element
      className={`rounded-card border border-line bg-surface p-6 shadow-card ${interaction} ${className}`}
      data-tilt={interactive ? "true" : undefined}
      onPointerMove={
        interactive
          ? (event) => {
              if (event.pointerType !== "mouse") return;
              const bounds = event.currentTarget.getBoundingClientRect();
              const x = (event.clientX - bounds.left) / bounds.width;
              const y = (event.clientY - bounds.top) / bounds.height;
              event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
              event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
              event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
              event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
            }
          : undefined
      }
      onPointerLeave={
        interactive
          ? (event) => {
              event.currentTarget.style.setProperty("--pointer-x", "50%");
              event.currentTarget.style.setProperty("--pointer-y", "50%");
              event.currentTarget.style.setProperty("--tilt-x", "0deg");
              event.currentTarget.style.setProperty("--tilt-y", "0deg");
            }
          : undefined
      }
      {...props}
    >
      {children}
    </Element>
  );
}
