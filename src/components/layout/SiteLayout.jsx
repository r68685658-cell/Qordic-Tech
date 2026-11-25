import { Outlet } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import { AIChatWidget } from "./AIChatWidget.jsx";
import { MobileQuoteBar } from "./MobileQuoteBar.jsx";
import { Navbar } from "./Navbar.jsx";
import { WhatsAppWidget } from "./WhatsAppWidget.jsx";

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-page text-ink">
      <a
        className="sr-only fixed left-4 top-4 z-[100] rounded-full bg-ink px-4 py-2 font-semibold text-page focus:not-sr-only focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-focus"
        href="#main"
      >
        Skip to content
      </a>
      <Navbar />
      <Outlet />
      <Footer />
      <MobileQuoteBar />
      <WhatsAppWidget />
      <AIChatWidget />
    </div>
  );
}
