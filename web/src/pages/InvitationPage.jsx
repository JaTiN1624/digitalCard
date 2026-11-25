import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useInvitation } from "../hooks/useInvitation.js";
import { getT } from "../i18n/index.js";
import { getTemplate } from "../templates/index.js";
import NotFoundPage from "./NotFoundPage.jsx";

export default function InvitationPage() {
  const { slug } = useParams();
  const { loading, invitation, error } = useInvitation(slug);

  if (loading) {
    return (
      <main className="page center">
        <p className="muted">Loading invitation…</p>
      </main>
    );
  }

  if (error?.status === 404) {
    return <NotFoundPage message="This invitation doesn't exist or isn't published yet." />;
  }

  if (error) {
    return (
      <main className="page center">
        <p className="form-error">{error.message}</p>
      </main>
    );
  }

  const Template = getTemplate(invitation.templateKey).component;
  return (
    <main>
      <Suspense fallback={<p className="page center muted">Loading invitation…</p>}>
        <Template invitation={invitation} t={getT(invitation.language)} />
      </Suspense>
    </main>
  );
}
