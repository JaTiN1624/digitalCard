import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import InvitationPage from "./pages/InvitationPage.jsx";
import TemplatesPage from "./pages/TemplatesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/i/:slug" element={<InvitationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
