import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageMeta } from "./components/layout/PageMeta.jsx";
import { SiteLayout } from "./components/layout/SiteLayout.jsx";
import { pages } from "./data/pages.js";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const SolutionsPage = lazy(() => import("./pages/SolutionsPage.jsx"));
const ProcessPage = lazy(() => import("./pages/ProcessPage.jsx"));
const GlobalPage = lazy(() => import("./pages/GlobalPage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.jsx"));
const FaqPage = lazy(() => import("./pages/FaqPage.jsx"));
const EstimatePage = lazy(() => import("./pages/EstimatePage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const ProjectInquiryPage = lazy(() => import("./pages/ProjectInquiryPage.jsx"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage.jsx"));
const TermsPage = lazy(() => import("./pages/TermsPage.jsx"));
const AdminAIPage = lazy(() => import("./pages/AdminAIPage.jsx"));
const routeComponents = {
  "/": HomePage,
  "/services": ServicesPage,
  "/solutions": SolutionsPage,
  "/process": ProcessPage,
  "/global": GlobalPage,
  "/about": AboutPage,
  "/blog": BlogPage,
  "/faq": FaqPage,
  "/estimate": EstimatePage,
  "/contact": ContactPage,
  "/start-project": ProjectInquiryPage,
  "/privacy": PrivacyPolicyPage,
  "/terms": TermsPage,
};

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-[55vh]" aria-label="Loading page" />}>
        <Routes>
          <Route
            path="/admin/ai"
            element={
              <PageTransition>
                <PageMeta
                  page={{
                    title: "Private AI Console | Qordic Technologies",
                    description: "Private administration page.",
                    noindex: true,
                  }}
                />
                <AdminAIPage />
              </PageTransition>
            }
          />
          <Route element={<SiteLayout />}>
            {pages.map((page) => {
              const Page = routeComponents[page.path];

              return (
                <Route
                  key={page.path}
                  path={page.path}
                  element={
                    <PageTransition>
                      <PageMeta page={page} />
                      <Page />
                    </PageTransition>
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <PageTransition>
                  <PageMeta
                    page={{
                      title: "Page not found | Qordic Technologies",
                      description: "The requested page could not be found.",
                      noindex: true,
                    }}
                  />
                  <main id="main" className="flex-1 px-4 py-24 text-center">
                    <h1 className="text-4xl font-bold">Page not found</h1>
                  </main>
                </PageTransition>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="route-page-transition"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
