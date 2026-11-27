import { Helmet } from "react-helmet-async";
import { useTheme } from "./ThemeProvider.jsx";
import { businessInfo } from "../../data/business.js";
import { websiteSchema } from "../../data/pages.js";

const canonicalBase = "https://qordictech.com";

export function PageMeta({ page }) {
  const { theme } = useTheme();
  const canonicalUrl = page.path
    ? `${canonicalBase}${page.path === "/" ? "/" : page.path}`
    : canonicalBase;
  const schemaNodes = Array.isArray(page.schema) ? page.schema : page.schema ? [page.schema] : [];
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": "https://qordictech.com/#website" },
    about: { "@id": "https://qordictech.com/#organization" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://qordictech.com/",
      },
      ...(page.path && page.path !== "/"
        ? [{
            "@type": "ListItem",
            position: 2,
            name: page.title.replace(/\s*\|.*$/, ""),
            item: canonicalUrl,
          }]
        : []),
    ],
  };
  const schema = [websiteSchema, webPageSchema, breadcrumbSchema, ...schemaNodes];
  const robots = page.noindex ? "noindex, follow" : "index, follow";

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:locale" content="en_PK" />
      <meta property="og:image" content="https://qordictech.com/assets/brand/qordic-mark.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content="https://qordictech.com/assets/brand/qordic-mark.png" />
      <meta
        name="theme-color"
        content={theme === "dark" ? "#06111f" : "#f7fbff"}
      />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
