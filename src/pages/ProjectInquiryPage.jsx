import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Code2,
  LoaderCircle,
  MapPin,
  Monitor,
  PenTool,
  Search,
  Video,
} from "lucide-react";
import { Button } from "../components/ui/Button.jsx";
import { Container } from "../components/ui/Container.jsx";
import { sendInquiryEmail } from "../lib/emailjs.js";

const categories = [
  { label: "Software Development", icon: Code2 },
  { label: "Real Estate", icon: MapPin },
  { label: "Website Development", icon: Monitor },
  { label: "Graphic Designing", icon: PenTool },
  { label: "SEO", icon: Search },
  { label: "Video Editing", icon: Video },
];

const emptyValues = { name: "", email: "", whatsapp: "", message: "", website: "" };

function initialValues(searchParams) {
  const service = `${searchParams.get("service") || ""} ${searchParams.get("need") || ""}`.toLowerCase();
  const message = searchParams.get("message") || (service.trim() ? `I would like to discuss ${service.trim()}.` : "");
  const category = service.includes("real estate")
    ? "Real Estate"
    : service.includes("website") || service.includes("portal")
      ? "Website Development"
      : service.includes("software") || service.includes("mobile") || service.includes("app")
        ? "Software Development"
        : "";
  return { ...emptyValues, message, categories: category ? [category] : [] };
}

export default function ProjectInquiryPage() {
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState(() => initialValues(searchParams));
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState({ status: "idle", message: "" });
  const sendingRef = useRef(false);

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    if (submission.status !== "sending") setSubmission({ status: "idle", message: "" });
  }

  function toggleCategory(category) {
    setValues((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category],
    }));
    if (submission.status !== "sending") setSubmission({ status: "idle", message: "" });
  }

  async function submit(event) {
    event.preventDefault();
    if (sendingRef.current) return;
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Enter your full name.";
    if (!values.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!values.whatsapp.trim()) nextErrors.whatsapp = "Enter your WhatsApp number.";
    else if (!/^[0-9+().\-\s]{6,40}$/.test(values.whatsapp.trim())) nextErrors.whatsapp = "Enter a valid WhatsApp number.";
    if (!values.message.trim()) nextErrors.message = "Tell us about your project and goals.";
    if (values.message.length > 4000) nextErrors.message = "Keep your message under 4,000 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    sendingRef.current = true;
    setSubmission({ status: "sending", message: "" });
    try {
      await sendInquiryEmail({
        formType: "Project Inquiry",
        name: values.name,
        email: values.email,
        whatsapp: values.whatsapp,
        projectCategories: values.categories,
        message: values.message,
        projectDetails: `Selected categories: ${values.categories.join(", ") || "Not provided"}`,
        honeyPot: values.website,
      });
      setSubmission({
        status: "success",
        message: "Your project inquiry was sent successfully. The QORDIC Technologies team can now follow up with you.",
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

  return (
    <main id="main">
      <section className="project-inquiry-hero">
        <Container>
          <p className="project-inquiry-eyebrow">Start with a clear brief</p>
          <h1>Tell us about your <span>project.</span></h1>
          <p>Share your goals and the QORDIC team will follow up to discuss a practical next step.</p>
        </Container>
      </section>
      <section className="project-inquiry-section" aria-labelledby="project-inquiry-title">
        <Container className="project-inquiry-layout">
          <div className="project-inquiry-aside">
            <p className="project-inquiry-eyebrow">Project inquiry</p>
            <h2 id="project-inquiry-title">A useful first step, without guesswork.</h2>
            <p>Tell us what you’re planning, and we’ll get back to you about the scope and requirements.</p>
            <p className="project-inquiry-note">Please don’t include passwords, payment information, or other sensitive personal details.</p>
            <Link to="/estimate">Prefer the step-by-step project scope form? <ArrowUpRight size={15} /></Link>
          </div>

          {submission.status === "success" ? (
            <div className="project-inquiry-success" role="status">
              <span><CheckCircle2 size={30} /></span>
              <h2>Thank you for reaching out.</h2>
              <p>{submission.message}</p>
              <Button to="/">Back to homepage</Button>
            </div>
          ) : (
            <form className="project-inquiry-form" onSubmit={submit} noValidate>
              <h2>Contact information</h2>
              <div className="project-inquiry-fields">
                <label htmlFor="project-name">Full Name <b>*</b>
                  <input id="project-name" name="name" autoComplete="name" maxLength={150} value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} required />
                  {errors.name && <small>{errors.name}</small>}
                </label>
                <label htmlFor="project-email">Email Address <b>*</b>
                  <input id="project-email" name="email" type="email" autoComplete="email" maxLength={254} value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} required />
                  {errors.email && <small>{errors.email}</small>}
                </label>
                <label htmlFor="project-whatsapp">WhatsApp Number <b>*</b>
                  <input id="project-whatsapp" name="whatsapp" type="tel" autoComplete="tel" maxLength={40} placeholder="Include country code if possible" value={values.whatsapp} onChange={update} aria-invalid={Boolean(errors.whatsapp)} required />
                  {errors.whatsapp && <small>{errors.whatsapp}</small>}
                </label>
              </div>

              <fieldset className="project-category-fieldset">
                <legend>Project Categories <span>(select any that apply)</span></legend>
                <div className="project-category-grid">
                  {categories.map(({ label, icon: Icon }) => {
                    const selected = values.categories.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        className={`project-category-card${selected ? " is-selected" : ""}`}
                        aria-pressed={selected}
                        onClick={() => toggleCategory(label)}
                      >
                        <Icon size={20} aria-hidden="true" />
                        <span>{label}</span>
                        <span className="project-category-check" aria-hidden="true">{selected && <Check size={14} />}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className="project-message-field" htmlFor="project-message">Message / Project Details <b>*</b>
                <textarea id="project-message" name="message" rows={6} maxLength={4000} placeholder="Tell us about your project, requirements and goals..." value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} required />
                <span className="project-message-meta">{errors.message ? <small>{errors.message}</small> : <small>Maximum 4,000 characters.</small>}<small>{values.message.length}/4000</small></span>
              </label>

              <div className="project-inquiry-honeypot" aria-hidden="true">
                <label htmlFor="project-website">Leave this field empty</label>
                <input id="project-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
              </div>

              {submission.status === "error" && <p className="project-inquiry-error" role="alert"><CircleAlert size={18} />{submission.message}</p>}
              <Button className="project-inquiry-submit" type="submit" disabled={submission.status === "sending"}>
                {submission.status === "sending" ? <><LoaderCircle className="animate-spin" size={18} /> Sending inquiry…</> : <>Submit Project Inquiry <ArrowUpRight size={18} /> </>}
              </Button>
              <p className="project-inquiry-privacy">By submitting, you’re asking QORDIC Technologies to contact you about this project inquiry.</p>
            </form>
          )}
        </Container>
      </section>
    </main>
  );
}
