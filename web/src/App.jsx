import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Each page is its own chunk: guests opening an invitation link never download the studio
// site, and visitors browsing designs never download an invitation they don't open.
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const TemplatesPage = lazy(() => import("./pages/TemplatesPage.jsx"));
const PricingPage = lazy(() => import("./pages/PricingPage.jsx"));
const OccasionPage = lazy(() => import("./pages/OccasionPage.jsx"));
const GuidesPage = lazy(() => import("./pages/GuidesPage.jsx"));
const InvitationPage = lazy(() => import("./pages/InvitationPage.jsx"));

const OCCASION_ROUTES = ["wedding", "birthday", "engagement", "anniversary", "baby-shower"];

export default function App() {
  return (
    <Suspense fallback={<main className="page center" aria-busy="true" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        {OCCASION_ROUTES.map((o) => (
          <Route key={o} path={`/${o}-invitations`} element={<OccasionPage />} />
        ))}
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:slug" element={<GuidesPage />} />
        <Route path="/i/:slug" element={<InvitationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
