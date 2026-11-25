import { ArrowUpRight, CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../../ui/Button.jsx";
import { Input } from "../../ui/Input.jsx";
import { sendInquiryEmail } from "../../../lib/emailjs.js";

export function LeadForm({
  title,
  description,
  serviceLabel,
  serviceOptions,
  privacy,
  initialValues,
  subjectLabel,
  messageLabel,
  messagePlaceholder,
  formType = "Contact Message",
  className = "",
}) {
  const [submission, setSubmission] = useState({ status: "idle", message: "" });
  const [errors, setErrors] = useState({});
  const sendingRef = useRef(false);
  const [values, setValues] = useState(() => ({
    name: "",
    email: "",
    need: "",
    subject: "",
    message: "",
    whatsapp: "",
    website: "",
    ...initialValues,
  }));

  function updateValue(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
    setErrors((current) => ({ ...current, [event.target.name]: "" }));
    if (submission.status !== "sending") setSubmission({ status: "idle", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (sendingRef.current) return;
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Enter your name.";
    if (!values.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      nextErrors.email = "Enter a valid email address.";
    if (!values.need) nextErrors.need = "Choose an area to discuss.";
    if (!values.message.trim()) nextErrors.message = "Enter a message.";
    if (values.message.length > 4000) nextErrors.message = "Keep your message under 4,000 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    sendingRef.current = true;
    setSubmission({ status: "sending", message: "" });
    try {
      await sendInquiryEmail({
        formType,
        name: values.name,
        email: values.email,
        whatsapp: values.whatsapp || "Not provided",
        projectCategories: values.need,
        message: values.message,
        projectDetails: [
          values.need && `Area of interest: ${values.need}`,
          values.subject && `${subjectLabel || "Subject"}: ${values.subject}`,
        ].filter(Boolean).join("\n"),
        honeyPot: values.website,
      });
      setSubmission({
        status: "success",
        message: "Your inquiry was sent successfully. Thank you for contacting QORDIC Technologies.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message: error instanceof Error
          ? error.message
          : "We couldn't send your inquiry. Please try again or contact us on WhatsApp.",
      });
    } finally {
      sendingRef.current = false;
    }
  }

  return (
    <form
      className={`lead-form grid gap-5 rounded-panel border border-line bg-surface p-5 shadow-lift sm:p-7 ${className}`}
      noValidate
      onSubmit={handleSubmit}
    >
      <div>
        <h3 className="text-xl font-bold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
      <Input
        autoComplete="name"
        error={errors.name}
        id="lead-name"
        label="Your name"
        name="name"
        onChange={updateValue}
        placeholder="How should we address you?"
        required
        value={values.name}
      />
      <Input
        autoComplete="email"
        error={errors.email}
        id="lead-email"
        label="Work email"
        name="email"
        onChange={updateValue}
        placeholder="you@company.com"
        required
        type="email"
        value={values.email}
      />
      <Input
        autoComplete="tel"
        id="lead-whatsapp"
        label="WhatsApp number (optional)"
        name="whatsapp"
        onChange={updateValue}
        placeholder="Include country code if possible"
        type="tel"
        value={values.whatsapp}
      />
      {subjectLabel && (
        <Input
          id="lead-subject"
          label={subjectLabel}
          name="subject"
          onChange={updateValue}
          value={values.subject}
        />
      )}
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-ink" htmlFor="lead-need">
          {serviceLabel}
        </label>
        <select
          aria-describedby={errors.need ? "lead-need-error" : undefined}
          aria-invalid={Boolean(errors.need)}
          className="min-h-11 w-full rounded-xl border border-line bg-page px-3.5 py-2.5 text-base text-ink focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20"
          id="lead-need"
          name="need"
          onChange={updateValue}
          required
          value={values.need}
        >
          <option value="" disabled>
            Choose an area
          </option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.need && (
          <p className="text-sm font-medium text-danger" id="lead-need-error">
            {errors.need}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-ink" htmlFor="lead-message">
          {messageLabel || "Message"} <span aria-hidden="true">*</span>
        </label>
        <textarea
          aria-describedby={errors.message ? "lead-message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          className="min-h-32 w-full resize-y rounded-xl border border-line bg-page px-3.5 py-2.5 text-base text-ink placeholder:text-muted/80 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20"
          id="lead-message"
          maxLength={4000}
          name="message"
          onChange={updateValue}
          placeholder={messagePlaceholder || "Tell us what you need help with..."}
          required
          value={values.message}
        />
        {errors.message && <p className="text-sm font-medium text-danger" id="lead-message-error">{errors.message}</p>}
      </div>
      <div className="lead-form-honeypot" aria-hidden="true">
        <label htmlFor="lead-website">Leave this field empty</label>
        <input
          autoComplete="off"
          id="lead-website"
          name="website"
          tabIndex={-1}
          type="text"
          value={values.website}
          onChange={updateValue}
        />
      </div>
      <Button className="w-full" disabled={submission.status === "sending"} type="submit">
        {submission.status === "sending" ? <><LoaderCircle className="animate-spin" size={17} /> Sending…</> : <>Submit inquiry<ArrowUpRight aria-hidden="true" size={17} /></>}
      </Button>
      {submission.status === "success" && <p className="flex gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm font-medium text-ink" role="status"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-700" size={18} aria-hidden="true" />{submission.message}</p>}
      {submission.status === "error" && <p className="flex gap-2 rounded-xl border border-danger/30 bg-danger/5 p-3 text-sm font-medium text-ink" role="alert"><CircleAlert className="mt-0.5 shrink-0 text-danger" size={18} aria-hidden="true" />{submission.message}</p>}
      <p className="text-xs leading-relaxed text-muted">{privacy}</p>
    </form>
  );
}
