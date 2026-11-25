const WHATSAPP_URL =
  "https://wa.me/923462641229?text=Hello%20QORDIC%20Technologies%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services";

export function WhatsAppWidget() {
  return (
    <a
      className="whatsapp-widget"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Qordic Technologies on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="whatsapp-tooltip" role="tooltip">
        Chat with us on WhatsApp
      </span>
      <svg
        className="whatsapp-icon"
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.02 3.2c-7.06 0-12.8 5.72-12.8 12.76 0 2.26.6 4.47 1.74 6.4L3.1 28.9l6.72-1.76a12.83 12.83 0 0 0 6.2 1.58h.01c7.05 0 12.78-5.73 12.79-12.77a12.68 12.68 0 0 0-3.75-9.04 12.72 12.72 0 0 0-9.05-3.71Zm0 23.35h-.01a10.64 10.64 0 0 1-5.42-1.48l-.39-.23-3.99 1.05 1.07-3.88-.25-.4a10.56 10.56 0 0 1-1.63-5.65c0-5.87 4.77-10.63 10.63-10.63 2.84 0 5.51 1.1 7.52 3.11a10.56 10.56 0 0 1 3.11 7.53c0 5.86-4.77 10.63-10.64 10.63Zm5.84-7.96c-.32-.16-1.88-.93-2.17-1.04-.29-.1-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.56-1.58-.95-.84-1.59-1.87-1.78-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.61 0 1.54 1.12 3.02 1.28 3.23.16.21 2.2 3.35 5.33 4.7.74.32 1.32.51 1.77.66.74.24 1.42.21 1.95.13.59-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
