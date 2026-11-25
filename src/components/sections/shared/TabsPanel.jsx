import { useId, useRef, useState } from "react";

export function TabsPanel({ items, label, initialTab, syncHash = false }) {
  const generatedId = useId();
  const tabsRef = useRef([]);
  const hashId = syncHash ? window.location.hash.slice(1) : "";
  const hashIndex = items.findIndex((item) => item.id === hashId);
  const initialIndex =
    hashIndex >= 0
      ? hashIndex
      : Math.max(0, items.findIndex((item) => item.id === initialTab));
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeItem = items[activeIndex];
  const tabId = (index) => `${generatedId}-tab-${items[index].id}`;
  const panelId = (index) => `${generatedId}-panel-${items[index].id}`;

  function handleKeyDown(event) {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const lastIndex = items.length - 1;
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? lastIndex
          : event.key === "ArrowRight"
            ? (activeIndex + 1) % items.length
            : (activeIndex - 1 + items.length) % items.length;

    setActiveIndex(nextIndex);
    tabsRef.current[nextIndex]?.focus();
    if (syncHash) {
      window.history.replaceState(null, "", `#${items[nextIndex].id}`);
    }
  }

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={label}
        onKeyDown={handleKeyDown}
      >
        {items.map((item, index) => (
          <button
            aria-controls={panelId(index)}
            aria-selected={activeIndex === index}
            className={`inline-flex min-h-11 items-center justify-center rounded-full border px-4 py-2 text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98] motion-reduce:transition-none ${activeIndex === index ? "border-transparent bg-brand-gradient text-white shadow-card" : "border-line bg-surface text-muted hover:border-violet hover:text-ink"}`}
            id={tabId(index)}
            key={item.id}
            ref={(element) => {
              tabsRef.current[index] = element;
            }}
            role="tab"
            tabIndex={activeIndex === index ? 0 : -1}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              if (syncHash) {
                window.history.replaceState(null, "", `#${item.id}`);
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <section
        aria-labelledby={tabId(activeIndex)}
        className="mt-5 rounded-panel border border-line bg-surface p-5 shadow-lift sm:p-8"
        id={syncHash ? activeItem.id : panelId(activeIndex)}
        role="tabpanel"
        tabIndex={0}
      >
        {activeItem.content}
      </section>
    </div>
  );
}
