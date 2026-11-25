import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Send,
  Sparkles,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { PageHero } from "../components/sections/shared/PageHero.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Container } from "../components/ui/Container.jsx";
import { Section } from "../components/ui/Section.jsx";
import { sendInquiryEmail } from "../lib/emailjs.js";
import { estimatePageHero, estimateProjectTypes } from "../data/estimate.js";

const scaleOptions = [
  { value: "Basic", description: "A focused first release with essential workflows and a clearly defined scope." },
  { value: "Standard", description: "A broader product with several connected features or user journeys." },
  { value: "Advanced", description: "More complex workflows, roles, integrations or operational requirements." },
  { value: "Enterprise", description: "A large or multi-team initiative with significant dependencies and coordination." },
];

const budgetOptions = ["Prefer not to say", "Under $5,000", "$5,000–$15,000", "$15,000–$50,000", "$50,000+", "To be discussed"];
const timelineOptions = ["Flexible", "Within 1–3 months", "Within 3–6 months", "More than 6 months", "To be discussed"];
const stepLabels = ["Project type", "Requirements", "Project scale", "Your details", "Review"];
const initialContact = { name: "", email: "", phone: "", company: "", description: "", consent: false, website: "" };

function ChoiceCard({ active, title, description, onClick, multiple = false }) {
  return (
    <button
      type="button"
      className={`estimator-choice${active ? " is-active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span className="estimator-choice-check" aria-hidden="true">{active && <Check size={15} />}</span>
      <span><strong>{title}</strong>{description && <small>{description}</small>}</span>
      {multiple && <span className="sr-only">Select multiple requirements</span>}
    </button>
  );
}

function SummaryLine({ label, children }) {
  return <div className="estimator-summary-line"><dt>{label}</dt><dd>{children}</dd></div>;
}

export default function EstimatePage() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [scale, setScale] = useState("Standard");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [contact, setContact] = useState(initialContact);
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState({ status: "idle", message: "" });
  const sendingRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const selectedProject = estimateProjectTypes.find((item) => item.value === projectType);
  const completion = Math.round(((step + 1) / stepLabels.length) * 100);
  const whatsappUrl = useMemo(() => {
    const text = projectType
      ? `Hello QORDIC Technologies, I would like to discuss a ${selectedProject?.label || "digital"} project.`
      : "Hello QORDIC Technologies, I would like to discuss a project.";
    return `https://wa.me/923462641229?text=${encodeURIComponent(text)}`;
  }, [projectType, selectedProject]);

  function toggleRequirement(value) {
    setRequirements((current) => current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]);
    if (submission.status !== "idle") setSubmission({ status: "idle", message: "" });
  }

  function chooseProjectType(value) {
    setProjectType(value);
    setRequirements([]);
    setErrors({});
    if (submission.status !== "idle") setSubmission({ status: "idle", message: "" });
  }

  function updateContact(event) {
    const { name, value, checked, type } = event.target;
    setContact((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    if (submission.status !== "idle") setSubmission({ status: "idle", message: "" });
  }

  function validateStep() {
    const nextErrors = {};
    if (step === 0 && !projectType) nextErrors.projectType = "Choose a project type to continue.";
    if (step === 3) {
      if (!contact.name.trim()) nextErrors.name = "Enter your name.";
      if (!contact.email.trim()) nextErrors.email = "Enter your email address.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) nextErrors.email = "Enter a valid email address.";
      if (!contact.phone.trim()) nextErrors.phone = "Enter a phone or WhatsApp number.";
      if (!contact.consent) nextErrors.consent = "Please confirm we may contact you about this enquiry.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (validateStep()) setStep((current) => Math.min(current + 1, stepLabels.length - 1));
  }

  async function submitInquiry(event) {
    event.preventDefault();
    if (sendingRef.current) return;
    if (!validateStep()) {
      setStep(3);
      return;
    }
    sendingRef.current = true;
    setSubmission({ status: "sending", message: "" });
    try {
      await sendInquiryEmail({
        formType: "Project Estimate Request",
        name: contact.name,
        email: contact.email,
        whatsapp: contact.phone,
        projectCategories: selectedProject?.label || "Not provided",
        message: contact.description.trim() || `Estimate request for ${selectedProject?.label || "a project"}.`,
        projectDetails: [
          `Selected project type: ${selectedProject?.label || "Not provided"}`,
          `Scope requirements: ${requirements.join(", ") || "To be discussed"}`,
          `Project scale: ${scale}`,
          `Budget range: ${budget || "Not specified"}`,
          `Target timeline: ${timeline || "Not specified"}`,
          `Company: ${contact.company.trim() || "Not provided"}`,
          `Contact permission confirmed: ${contact.consent ? "Yes" : "No"}`,
          `Additional project details: ${contact.description.trim() || "Not provided"}`,
        ].join("\n"),
        honeyPot: contact.website,
      });
      setSubmission({
        status: "success",
        message: "Your project estimate request was sent successfully. The QORDIC Technologies team can now review your brief and follow up.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message: error instanceof Error
          ? error.message
          : "We couldn't send your inquiry. Your details are still here; please try again.",
      });
    } finally {
      sendingRef.current = false;
    }
  }

  const currentProjectRequirements = selectedProject?.requirements || [];

  return (
    <main id="main">
      <PageHero {...estimatePageHero} />
      <Section as="section" id="project-estimate" className="estimator-section">
        <Container>
          <div className="estimator-intro">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-violet-strong">Project scope estimator</p>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl" id="estimate-title">
              Let&apos;s Plan Your <span className="bg-brand-gradient bg-clip-text text-transparent">Next Digital Project</span>
            </h2>
            <p className="mt-4 max-w-prose text-muted">Tell us about your vision and we&apos;ll help you understand the scope of your project.</p>
          </div>

          <div className="estimator-panel">
            <div className="estimator-progress">
              <div className="estimator-progress-top"><span>Step {step + 1} of {stepLabels.length}</span><span>{completion}% complete</span></div>
              <div className="estimator-progress-track"><span style={{ width: `${completion}%` }} /></div>
              <ol aria-label="Project inquiry steps">
                {stepLabels.map((label, index) => (
                  <li key={label} className={index === step ? "is-current" : index < step ? "is-complete" : ""}>
                    <span>{index < step ? <Check size={13} /> : index + 1}</span><small>{label}</small>
                  </li>
                ))}
              </ol>
            </div>

            {submission.status === "success" ? (
              <div className="estimator-success" role="status">
                <span><CheckCircle2 size={30} /></span>
                <h3>Thanks for sharing your project.</h3>
                <p>{submission.message}</p>
                <div className="estimator-actions"><Button to="/">Back to homepage</Button><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Continue on WhatsApp <ArrowRight size={16} /></a></div>
              </div>
            ) : (
              <form className="estimator-form" onSubmit={submitInquiry} noValidate>
                <motion.div
                  className="estimator-step"
                  key={step}
                  initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                >
                    {step === 0 && (
                      <>
                        <div className="estimator-step-heading"><span>STEP 1</span><h3>What are you planning?</h3><p>Choose the area that best fits your idea. You can refine it with our team later.</p></div>
                        <div className="estimator-choice-grid">
                          {estimateProjectTypes.map((item) => (
                            <ChoiceCard key={item.value} active={projectType === item.value} title={item.label} description={item.description} onClick={() => chooseProjectType(item.value)} />
                          ))}
                        </div>
                        {errors.projectType && <p className="estimator-field-error" role="alert">{errors.projectType}</p>}
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <div className="estimator-step-heading"><span>STEP 2</span><h3>Which requirements should we consider?</h3><p>Select any that apply to {selectedProject?.label.toLowerCase()}. These are discussion points, not commitments.</p></div>
                        <div className="estimator-choice-grid">
                          {currentProjectRequirements.map((requirement) => (
                            <ChoiceCard key={requirement} active={requirements.includes(requirement)} title={requirement} onClick={() => toggleRequirement(requirement)} multiple />
                          ))}
                        </div>
                        <p className="estimator-hint">You can continue without selecting requirements if you&apos;re still exploring.</p>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="estimator-step-heading"><span>STEP 3</span><h3>How large is the initial scope?</h3><p>Choose a starting point. We&apos;ll confirm complexity after discussing the details.</p></div>
                        <div className="estimator-choice-grid estimator-scale-grid">
                          {scaleOptions.map((option) => (
                            <ChoiceCard key={option.value} active={scale === option.value} title={option.value} description={option.description} onClick={() => setScale(option.value)} />
                          ))}
                        </div>
                        <div className="estimator-optional-fields">
                          <label>Budget range <span>Optional</span>
                            <select value={budget} onChange={(event) => setBudget(event.target.value)}>
                              <option value="">Prefer not to say</option>
                              {budgetOptions.slice(1).map((option) => <option key={option}>{option}</option>)}
                            </select>
                          </label>
                          <label>Target timeline <span>Optional</span>
                            <select value={timeline} onChange={(event) => setTimeline(event.target.value)}>
                              <option value="">Not decided</option>
                              {timelineOptions.map((option) => <option key={option}>{option}</option>)}
                            </select>
                          </label>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <div className="estimator-step-heading"><span>STEP 4</span><h3>How can we reach you?</h3><p>We&apos;ll use these details only to follow up about this project enquiry.</p></div>
                        <div className="estimator-contact-grid">
                          <label>Full name <b>*</b><input autoComplete="name" name="name" value={contact.name} onChange={updateContact} aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
                          <label>Email <b>*</b><input autoComplete="email" name="email" type="email" value={contact.email} onChange={updateContact} aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
                          <label>Phone / WhatsApp <b>*</b><input autoComplete="tel" name="phone" type="tel" value={contact.phone} onChange={updateContact} aria-invalid={Boolean(errors.phone)} />{errors.phone && <small>{errors.phone}</small>}</label>
                          <label>Company name <span>Optional</span><input autoComplete="organization" name="company" value={contact.company} onChange={updateContact} /></label>
                          <label className="estimator-description-field">Additional project details <span>Optional</span><textarea name="description" rows={4} maxLength={4000} value={contact.description} onChange={updateContact} placeholder="What would you like the project to help you do?" /></label>
                        </div>
                        <label className="estimator-consent"><input type="checkbox" name="consent" checked={contact.consent} onChange={updateContact} /><span>I agree that QORDIC Technologies may contact me about this enquiry. <b>*</b></span></label>
                        {errors.consent && <p className="estimator-field-error" role="alert">{errors.consent}</p>}
                        <div className="project-inquiry-honeypot" aria-hidden="true">
                          <label htmlFor="estimate-website">Leave this field empty</label>
                          <input id="estimate-website" name="website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={updateContact} />
                        </div>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <div className="estimator-step-heading"><span>STEP 5</span><h3>Review your project brief</h3><p>No prices are estimated here. Your requirements are ready for a scope discussion and suitable quotation.</p></div>
                        <dl className="estimator-summary">
                          <SummaryLine label="Project type">{selectedProject?.label}</SummaryLine>
                          <SummaryLine label="Requirements">{requirements.length ? requirements.join(", ") : "To be discussed"}</SummaryLine>
                          <SummaryLine label="Project scale">{scale}</SummaryLine>
                          <SummaryLine label="Budget">{budget || "Not specified"}</SummaryLine>
                          <SummaryLine label="Timeline">{timeline || "Not specified"}</SummaryLine>
                          <SummaryLine label="Contact">{contact.name} · {contact.email} · {contact.phone}</SummaryLine>
                          {contact.company && <SummaryLine label="Company">{contact.company}</SummaryLine>}
                          {contact.description && <SummaryLine label="Project details">{contact.description}</SummaryLine>}
                        </dl>
                        <p className="estimator-no-price"><Sparkles size={16} /> Your project requirements are ready for review. Our team can discuss the scope and provide a suitable quotation.</p>
                      </>
                    )}
                </motion.div>

                {submission.status === "error" && (
                  <div className="estimator-error" role="alert"><CircleAlert size={18} /><p>{submission.message}</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Contact us on WhatsApp <ArrowRight size={15} /></a></div>
                )}
                <div className="estimator-nav">
                  <button type="button" className="estimator-back" onClick={() => { setErrors({}); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0 || submission.status === "sending"}><ArrowLeft size={16} /> Back</button>
                  {step < 4 ? (
                    <Button type="button" onClick={goNext}>Continue <ArrowRight size={16} /></Button>
                  ) : (
                    <Button type="submit" disabled={submission.status === "sending"}>{submission.status === "sending" ? "Submitting…" : "Submit inquiry"} <Send size={16} /></Button>
                  )}
                </div>
                <p className="estimator-privacy">Your inquiry is sent through QORDIC Technologies&apos; configured email service. Please don&apos;t include passwords or sensitive personal information.</p>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
