import { Container } from "../components/ui/Container.jsx";

export default function TermsPage() {
  return (
    <main id="main" className="legal-page py-16 sm:py-20">
      <Container className="max-w-[860px]">
        <p className="legal-kicker">Legal</p>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-updated">Last updated: 22 November 2026</p>

        <section>
          <h2>Website use</h2>
          <p>
            By using this website, you agree to use it lawfully and not to interfere
            with its operation, security or availability.
          </p>
        </section>
        <section>
          <h2>Services and proposals</h2>
          <p>
            Information on this website is provided for general description and
            does not create a contractual commitment. Scope, pricing, timelines,
            ownership and support obligations should be documented in a signed
            agreement or proposal.
          </p>
        </section>
        <section>
          <h2>AI assistant</h2>
          <p>
            The website AI assistant provides automated information based on
            published and administrator-approved company material. Its answers are
            informational, may be incomplete, and do not constitute a quote,
            guarantee, or binding proposal. Confirm project scope, pricing,
            timelines and commitments with Qordic Technologies directly.
          </p>
        </section>
        <section>
          <h2>Intellectual property</h2>
          <p>
            Unless otherwise stated, website content and branding belong to their
            respective owners. Project deliverables, third-party components and
            license terms should be addressed explicitly in the applicable agreement.
          </p>
        </section>
        <section>
          <h2>User responsibilities</h2>
          <p>
            You are responsible for the accuracy of information submitted, your
            lawful use of project materials and safeguarding credentials or sensitive
            information shared during a legitimate engagement.
          </p>
        </section>
        <section>
          <h2>Third-party links</h2>
          <p>
            The website may link to services operated by third parties. Their terms
            and policies apply when you choose to use those services.
          </p>
        </section>
        <section>
          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Qordic Technologies is not liable
            for indirect or consequential loss arising from use of this website.
            Specific liability and service commitments should be governed by the
            applicable signed agreement.
          </p>
        </section>
        <section>
          <h2>Changes</h2>
          <p>
            These terms may be updated to reflect changes to the website or legal
            requirements. The date above indicates the latest published revision.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be submitted through the <a href="/contact">contact page</a>.
          </p>
        </section>
      </Container>
    </main>
  );
}
