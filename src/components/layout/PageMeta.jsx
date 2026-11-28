import { Helmet } from "react-helmet-async";
import { useTheme } from "./ThemeProvider.jsx";
import { businessInfo } from "../../data/business.js";
import { websiteSchema } from "../../data/pages.js";

const canonicalBase = "https://qordictech.com";
const socialImage = `${canonicalBase}/assets/brand/qordic-social-share.png`;
const socialImageAlt = "Qordic Technologies wordmark on a dark blue and violet background.";

export function PageMeta({ page }) {
  const { theme } = useTheme();
  const canonicalUrl = page.path
    ? `${canonicalBase}${page.path === "/" ? "/" : page.path}`
    : null;
  const schemaNodes = Array.isArray(page.schema) ? page.schema : page.schema ? [page.schema] : [];
  const webPageSchema = canonicalUrl && {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": "https://qordictech.com/#website" },
    about: { "@id": "https://qordictech.com/#organization" },
  };
  const breadcrumbLabel = page.label || page.title.replace(/\s*\|.*$/, "").trim();
  const breadcrumbSchema = canonicalUrl && page.path !== "/" && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://qordictech.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabel,
        item: canonicalUrl,
      },
    ],
  };
  const schema = canonicalUrl
    ? [
        websiteSchema,
        webPageSchema,
        ...(breadcrumbSchema ? [breadcrumbSchema] : []),
        ...schemaNodes,
      ]
    : [];
  const robots = page.noindex ? "noindex, follow" : "index, follow";

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content={robots} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:site_name" content={businessInfo.name} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:secure_url" content={socialImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={socialImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={socialImageAlt} />
      <meta
        name="theme-color"
        content={theme === "dark" ? "#06111f" : "#f7fbff"}
      />
      {schema.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
