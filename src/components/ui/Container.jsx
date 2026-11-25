export function Container({ as: Element = "div", className = "", children, ...props }) {
  return (
    <Element
      className={`mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8 2xl:max-w-content-wide ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}
