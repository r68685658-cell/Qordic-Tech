import { lazy, Suspense } from "react";
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
          <Route path="/admin/ai" element={<AdminAIPage />} />
          <Route element={<SiteLayout />}>
            {pages.map((page) => {
              const Page = routeComponents[page.path];

              return (
                <Route
                  key={page.path}
                  path={page.path}
                  element={
                    <>
                      <PageMeta page={page} />
                      <Page />
                    </>
                  }
                />
              );
            })}
            <Route
              path="*"
              element={
                <>
                  <PageMeta
                    page={{
                      title: "Page not found | Qordic Technologies",
                      description: "The requested page could not be found.",
                    }}
                  />
                  <main id="main" className="flex-1 px-4 py-24 text-center">
                    <h1 className="text-4xl font-bold">Page not found</h1>
                  </main>
                </>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
