import { Helmet } from "react-helmet-async";
import { useTheme } from "./ThemeProvider.jsx";

export function PageMeta({ page }) {
  const { theme } = useTheme();

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:site_name" content="Qordic Technologies" />
      <meta
        name="theme-color"
        content={theme === "dark" ? "#06111f" : "#f7fbff"}
      />
      {page.schema && (
        <script type="application/ld+json">
          {JSON.stringify(page.schema)}
        </script>
      )}
    </Helmet>
  );
}
