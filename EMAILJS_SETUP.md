# EmailJS setup for QORDIC Technologies

Public website inquiries are sent from the browser using the official `@emailjs/browser` SDK. No Gmail password or EmailJS Private Key belongs in this project.

## Configure EmailJS

1. Create or sign in to an [EmailJS account](https://www.emailjs.com/).
2. Add an Email Service and connect the Gmail account that should receive inquiries.
3. Create one email template for Contact Message, Project Inquiry, and Project Estimate Request.
4. Set the template's **To Email** to the Gmail inbox where QORDIC should receive inquiries. Do not use the visitor's address as the sender.
5. Set the subject to:

   ```text
   New {{form_type}} — QORDIC Technologies
   ```

6. Set **Reply-To** to `{{email}}`. Keep the connected EmailJS service as the sender.
7. Copy the Service ID, Template ID, and browser-facing Public Key from the EmailJS dashboard.
8. Create a `.env` file in the project root using `.env.example`, then fill in:

   ```dotenv
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

   The Public Key is intended for browser use; it is not a secret. Do not put an EmailJS Private Key or Gmail password in any `VITE_` variable or frontend source file.
9. Restart the Vite development server after changing environment variables.
10. Submit a test inquiry from the website and confirm it arrives in the configured Gmail inbox. The website reports success only after EmailJS returns a successful response.

## Suggested email template

Use the connected EmailJS service as the From address. Set Reply-To to `{{email}}`.

**Subject**

```text
New {{form_type}} — QORDIC Technologies
```

**Body**

```text
New website inquiry

Form type: {{form_type}}
Submitted: {{submitted_at}}
Page: {{page_url}}

Contact
Name: {{name}}
Email: {{email}}
WhatsApp: {{whatsapp}}

Project categories:
{{project_categories}}

Message:
{{message}}

Project / estimate details:
{{project_details}}
```

The template variables are `form_type`, `name`, `email`, `whatsapp`, `project_categories`, `message`, `project_details`, `submitted_at`, and `page_url`. Forms without a WhatsApp number or category send `Not provided`.

## Protect the public form

- In EmailJS dashboard security settings, add the production website domain to Allowed Origins / Origin Whitelist.
- Add `localhost` / `127.0.0.1` origins only while developing or testing, then remove origins that are no longer needed.
- Enable EmailJS account rate limiting. The website SDK also blocks headless browsers and applies a 10-second client-side sending throttle.
- Keep the honeypot field enabled; do not remove it when adjusting the forms.
- Do not log full inquiry bodies or contact details in browser/server logs.
- If any credential other than the browser-facing Public Key was exposed, rotate it in the EmailJS dashboard.

When configuration is missing or EmailJS rejects a request, the form displays an error and keeps the visitor's entered values. It does not show a success state.
