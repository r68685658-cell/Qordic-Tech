export function Section({
  as: Element = "section",
  className = "",
  children,
  ...props
}) {
  return (
    <Element
      className={`py-16 sm:py-20 lg:py-28 ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}
