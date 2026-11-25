import { Container } from "../components/ui/Container.jsx";

export default function PrivacyPolicyPage() {
  return (
    <main id="main" className="legal-page py-16 sm:py-20">
      <Container className="max-w-[860px]">
        <p className="legal-kicker">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: 23 November 2026</p>

        <section>
          <h2>Overview</h2>
          <p>
            This Privacy Policy explains how Qordic Technologies describes the handling
            of information submitted through this website. If you have questions,
            contact us before submitting personal or confidential information.
          </p>
        </section>
        <section>
          <h2>Information you provide</h2>
          <p>
            We may collect information entered into a contact or project enquiry form,
            including your name, email address, WhatsApp number, service interest and
            project details. Website inquiry forms use EmailJS to send those details
            to the QORDIC Technologies inbox configured by the site operator. EmailJS
            processes the submission as a service provider; review its current privacy
            terms before production use. Do not include passwords or sensitive
            personal or confidential information.
          </p>
        </section>
        <section>
          <h2>AI assistant conversations</h2>
          <p>
            Messages sent to the website AI assistant are stored with the
            conversation so the assistant can respond to follow-up questions and
            authorized administrators can review support needs and improve approved
            company information. Conversation records are automatically deleted
            after 90 days by default. Do not share passwords, payment information,
            sensitive personal information or confidential project material in the
            chat. You can contact the team through the contact page or WhatsApp
            instead.
          </p>
        </section>
        <section>
          <h2>How information may be used</h2>
          <p>
            Information submitted for a business enquiry may be used to respond,
            understand the proposed work, arrange a consultation and maintain related
            business communications.
          </p>
        </section>
        <section>
          <h2>Cookies and analytics</h2>
          <p>
            This page does not claim specific cookie or analytics practices that have
            not been implemented or independently confirmed. Website operators should
            document any analytics, advertising or preference technologies before
            production use.
          </p>
        </section>
        <section>
          <h2>Sharing and retention</h2>
          <p>
            Inquiry details are shared with the configured EmailJS service and the
            QORDIC Technologies inbox to enable a response. New public website form
            submissions are not saved to the website's project-inquiry database.
            Records already collected by prior versions of the inquiry service may
            remain available to authorized administrators until deleted. Contact us
            through the contact page to ask about an enquiry or request its deletion.
            Review applicable legal requirements and EmailJS retention terms before
            production use.
          </p>
        </section>
        <section>
          <h2>Security</h2>
          <p>
            Reasonable safeguards should be used to protect submitted information.
            However, no internet transmission or storage method can be guaranteed
            completely secure.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            For privacy questions or to request more information about how an enquiry
            is handled, use the <a href="/contact">contact page</a>.
          </p>
        </section>
      </Container>
    </main>
  );
}
