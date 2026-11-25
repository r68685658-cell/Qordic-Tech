import { init, send } from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();
let initialized = false;

export async function sendInquiryEmail({
  formType,
  name,
  email,
  whatsapp = "Not provided",
  projectCategories = "Not provided",
  message,
  projectDetails = "Not provided",
  honeyPot = "",
}) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Email delivery is not configured yet. Please contact QORDIC Technologies on WhatsApp instead.",
    );
  }
  if (honeyPot) {
    throw new Error("The inquiry could not be submitted. Please try again.");
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();
  if (!cleanName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || !cleanMessage) {
    throw new Error("Enter your name, a valid email address, and a message.");
  }
  if (cleanName.length > 150 || cleanEmail.length > 254 || cleanMessage.length > 4000) {
    throw new Error("Some inquiry details exceed the allowed length. Please shorten them and try again.");
  }

  if (!initialized) {
    init({
      publicKey,
      blockHeadless: true,
      limitRate: { id: "qordic-public-inquiries", throttle: 10000 },
    });
    initialized = true;
  }

  try {
    const response = await send(serviceId, templateId, {
      form_type: formType,
      name: cleanName,
      email: cleanEmail,
      whatsapp: whatsapp.trim() || "Not provided",
      project_categories: Array.isArray(projectCategories)
        ? projectCategories.join(", ") || "Not provided"
        : projectCategories.trim() || "Not provided",
      message: cleanMessage,
      project_details: projectDetails.trim() || "Not provided",
      submitted_at: new Date().toISOString(),
      page_url: window.location.href,
    });
    if (response.status !== 200) {
      throw new Error("EmailJS did not confirm successful delivery.");
    }
    return response;
  } catch {
    throw new Error(
      "We couldn't send your inquiry right now. Your details are still here; please try again in a few moments.",
    );
  }
}
