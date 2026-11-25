import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import {
  blogPageHero,
  blogSectionContent,
  plannedArticles,
} from "../data/blog.js";
import { FeatureGrid } from "../components/sections/shared/FeatureGrid.jsx";

export default function BlogPage() {
  return (
    <main id="main">
      <PageHero {...blogPageHero} />
      <Section as="section" id="planned-articles">
        <Container>
          <div className="mb-9">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">
              {blogSectionContent.eyebrow}
            </p>
            <h2
              className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl"
              id="blog-title"
            >
              {blogSectionContent.title}{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {blogSectionContent.accent}
              </span>
            </h2>
          </div>
          <FeatureGrid
            items={plannedArticles.map((article) => ({
              ...article,
              kicker: blogSectionContent.cardKicker,
            }))}
            columns={3}
          />
        </Container>
      </Section>
    </main>
  );
}
